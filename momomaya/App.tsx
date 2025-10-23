import React, { useState, useCallback, useEffect } from 'react';
import { MENU_ITEMS } from './constants';
import { MenuItem as MenuItemType, OrderItem } from './types';
import Menu from './components/Menu';
import Bill from './components/Bill';
import PrintReceipt from './components/PrintReceipt';
import VariantSelectionModal from './components/VariantSelectionModal';
import Analytics from './components/Analytics';
import BillPreviewModal from './components/BillPreviewModal';
import { saveCompletedOrder, peekNextBillNumber } from './utils/storage';

function App() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [view, setView] = useState<'pos' | 'reports'>('pos');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [pendingBillNumber, setPendingBillNumber] = useState<number | null>(null);

  const handleAddItem = useCallback((itemToAdd: OrderItem) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === itemToAdd.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === itemToAdd.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...prevOrder, { ...itemToAdd, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setOrder((prevOrder) => {
      if (newQuantity <= 0) {
        return prevOrder.filter((item) => item.id !== itemId);
      }
      return prevOrder.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleClearOrder = useCallback(() => {
    setOrder([]);
  }, []);

  const handleSelectItem = (item: MenuItemType) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handlePreviewOrder = () => {
    if (order.length > 0) {
      setPendingBillNumber(peekNextBillNumber());
      setIsPreviewing(true);
    }
  };

  const handleConfirmPrint = () => {
    if (order.length === 0) return;

    const total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 1. Save the order to local storage (this will assign the bill number)
    saveCompletedOrder(order, total);

    // 2. Trigger the browser's print dialog
    window.print();
    
    // 3. Clear the current order and close the modal
    handleClearOrder();
    setIsPreviewing(false);
    setPendingBillNumber(null);
  };

  const handleClosePreview = () => {
    setIsPreviewing(false);
    setPendingBillNumber(null);
  }
  
  return (
    <>
      {/* This wrapper contains the entire on-screen UI and is hidden during printing */}
      <div className="min-h-screen font-sans print:hidden">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wider">Momomaya</h1>
          <button
            onClick={() => setView(view === 'pos' ? 'reports' : 'pos')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {view === 'pos' ? 'View Reports' : 'Back to POS'}
          </button>
        </header>
        <main className="h-[calc(100vh-68px)]">
          {view === 'pos' ? (
             <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-3/5 lg:w-2/3 p-4 overflow-y-auto">
                <Menu menuItems={MENU_ITEMS} onSelectItem={handleSelectItem} />
              </div>
              <div className="md:w-2/5 lg:w-1/3 bg-gray-800 p-4 flex flex-col">
                <Bill 
                  orderItems={order} 
                  onUpdateQuantity={handleUpdateQuantity}
                  onClear={handleClearOrder}
                  onPreview={handlePreviewOrder}
                />
              </div>
            </div>
          ) : (
            <Analytics />
          )}
        </main>
        
        <VariantSelectionModal 
          item={selectedItem}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
        />
        <BillPreviewModal
          isOpen={isPreviewing}
          onClose={handleClosePreview}
          onConfirm={handleConfirmPrint}
          orderItems={order}
          billNumber={pendingBillNumber}
        />
      </div>

      {/* This div is only visible when printing */}
      <div className="hidden print:block">
        <PrintReceipt orderItems={order} billNumber={pendingBillNumber} />
      </div>
    </>
  );
}

export default App;
