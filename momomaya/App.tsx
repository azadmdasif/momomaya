import { useState, useCallback, useEffect, useRef } from 'react';
import { MENU_ITEMS, BRANCHES } from './constants';
import { MenuItem as MenuItemType, OrderItem, PaymentMethod } from './types';
import Menu from './components/Menu';
import Bill from './components/Bill';
import PrintReceipt from './components/PrintReceipt';
import VariantSelectionModal from './components/VariantSelectionModal';
import Analytics from './components/Analytics';
import BillPreviewModal from './components/BillPreviewModal';
import BranchSelectionModal from './components/BranchSelectionModal';
import { saveCompletedOrder, peekNextBillNumber, getSelectedBranch, setSelectedBranch } from './utils/storage';

function App() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [view, setView] = useState<'pos' | 'reports'>('pos');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [pendingBillNumber, setPendingBillNumber] = useState<number | null>(null);
  const [paymentMethodForPrint, setPaymentMethodForPrint] = useState<PaymentMethod | null>(null);
  const [currentBranch, setCurrentBranch] = useState<string | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const originalDocumentTitle = useRef(document.title);

  useEffect(() => {
    const branch = getSelectedBranch();
    if (branch) {
      setCurrentBranch(branch);
    } else {
      setIsBranchModalOpen(true); // Force selection on first launch
    }
  }, []);

  const handleSelectBranch = (branchName: string) => {
    setSelectedBranch(branchName);
    setCurrentBranch(branchName);
    setIsBranchModalOpen(false);
  };

  const handleAddItem = useCallback((itemsToAdd: OrderItem[]) => {
    setOrder((prevOrder) => {
      let newOrder = [...prevOrder];
      itemsToAdd.forEach(itemToAdd => {
        const existingItemIndex = newOrder.findIndex(
          (orderItem) => orderItem.id === itemToAdd.id
        );
        if (existingItemIndex > -1) {
          // Item already exists, update quantity
          newOrder[existingItemIndex] = {
            ...newOrder[existingItemIndex],
            quantity: newOrder[existingItemIndex].quantity + itemToAdd.quantity,
          };
        } else {
          // New item, add to order
          // If it's an add-on, insert it right after its parent item
          if (itemToAdd.parentItemId) {
              const parentIndex = newOrder.findIndex(i => i.id === itemToAdd.parentItemId);
              if (parentIndex > -1) {
                  newOrder.splice(parentIndex + 1, 0, itemToAdd);
              } else {
                  newOrder.push(itemToAdd); // Fallback: add to end if parent not found
              }
          } else {
            newOrder.push(itemToAdd);
          }
        }
      });
      return newOrder;
    });
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setOrder((prevOrder) => {
      let newOrder = [...prevOrder];
      const itemIndex = newOrder.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return prevOrder; // Item not found

      const itemInfo = newOrder[itemIndex];
      const menuItem = MENU_ITEMS.find(mi => mi.id === itemInfo.menuItemId);

      if (newQuantity <= 0) {
        // Remove the item
        newOrder = newOrder.filter((item) => item.id !== itemId);
        // If it was a momo, also remove its addon items
        if (menuItem?.category === 'momo') {
          newOrder = newOrder.filter(item => item.parentItemId !== itemId);
        }
      } else {
        // Update item quantity
        newOrder[itemIndex] = { ...itemInfo, quantity: newQuantity };
        // If it's a momo, find and update all its addon items' quantities
        if (menuItem?.category === 'momo') {
          newOrder = newOrder.map(orderItem => {
            if (orderItem.parentItemId === itemId) {
              return { ...orderItem, quantity: newQuantity };
            }
            return orderItem;
          });
        }
      }
      return newOrder;
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

  const handleConfirmPrint = (paymentMethod: PaymentMethod) => {
    if (order.length === 0 || !currentBranch) return;

    const total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const billNumberToPrint = pendingBillNumber;

    setPaymentMethodForPrint(paymentMethod);
    saveCompletedOrder(order, total, paymentMethod, currentBranch);

    // Using a short timeout to ensure state updates have been processed before printing
    setTimeout(() => {
      // Set a unique title for the PDF/print job
      if (billNumberToPrint) {
        document.title = `Momomaya-Bill-${billNumberToPrint}`;
      }

      const handleAfterPrint = () => {
        // Restore the original title
        document.title = originalDocumentTitle.current;
        
        // Reset the order and UI state
        handleClearOrder();
        setIsPreviewing(false);
        setPendingBillNumber(null);
        setPaymentMethodForPrint(null);
        
        // Clean up the event listener
        window.removeEventListener('afterprint', handleAfterPrint);
      };

      // Add the event listener for after the print dialog is closed
      window.addEventListener('afterprint', handleAfterPrint);

      // Trigger the print dialog
      window.print();
    }, 100);
  };

  const handleClosePreview = () => {
    setIsPreviewing(false);
    setPendingBillNumber(null);
  }
  
  const isPosDisabled = !currentBranch;

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center print:hidden border-b border-brand-brown/10">
        <div className="flex items-center gap-3">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 12.5C18 16.0376 15.3137 19 12 19C8.68629 19 6 16.0376 6 12.5C6 9 12 6.5 12 6.5C12 6.5 18 9 18 12.5Z" fill="#FBBF24" stroke="#D95323" strokeWidth="1.5"/>
              <path d="M12 6.5C11.5 8 10 8.5 9 9.5M12 6.5C12.5 8 14 8.5 15 9.5M10 4.5C10.5 3.5 11 3 12 3C13 3 13.5 3.5 14 4.5M11 2C11.5 1.5 12 1 12 1C12 1 12.5 1.5 13 2" stroke="#D95323" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <h1 className="text-2xl font-extrabold text-brand-brown tracking-wider">Momomaya</h1>
              {currentBranch && <span className="text-xs text-brand-brown/70 font-semibold">{currentBranch}</span>}
            </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsBranchModalOpen(true)}
            className="text-brand-brown font-bold py-2 px-4 rounded-lg text-sm transition-colors hover:bg-brand-brown/10 disabled:text-brand-brown/40 disabled:bg-transparent"
            disabled={!currentBranch}
          >
            Change Branch
          </button>
          <button
            onClick={() => setView(view === 'pos' ? 'reports' : 'pos')}
            className="bg-brand-red hover:bg-brand-red/90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {view === 'pos' ? 'View Reports' : 'Back to POS'}
          </button>
        </div>
      </header>
      <main className="h-[calc(100vh-84px)] print:hidden">
        {view === 'pos' ? (
           <div className={`flex flex-col md:flex-row h-full ${isPosDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="md:w-3/5 lg:w-2/3 p-4 overflow-y-auto">
              <Menu menuItems={MENU_ITEMS} onSelectItem={handleSelectItem} />
            </div>
            <div className="md:w-2/5 lg:w-1/3 bg-brand-brown p-4 flex flex-col">
              <Bill 
                orderItems={order} 
                onUpdateQuantity={handleUpdateQuantity}
                onClear={handleClearOrder}
                onPreview={handlePreviewOrder}
                branchName={currentBranch}
                onAddItem={handleAddItem}
              />
            </div>
          </div>
        ) : (
          <Analytics />
        )}
      </main>
      <div id="printable-receipt" className="hidden print:block">
        <PrintReceipt 
          orderItems={order} 
          billNumber={pendingBillNumber} 
          paymentMethod={paymentMethodForPrint}
          branchName={currentBranch}
        />
      </div>
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
        branchName={currentBranch}
        onAddItem={handleAddItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <BranchSelectionModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onSelectBranch={handleSelectBranch}
        branches={BRANCHES}
        isInitialSelection={!currentBranch}
      />
    </div>
  );
}

export default App;