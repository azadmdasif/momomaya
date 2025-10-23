import React from 'react';
import { OrderItem } from '../types';
import BillItem from './BillItem';

interface BillProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClear: () => void;
  onPreview: () => void;
}

const Bill: React.FC<BillProps> = ({ orderItems, onUpdateQuantity, onClear, onPreview }) => {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-800 flex flex-col h-full rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Current Bill</h2>
      {orderItems.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400">Click on menu items to add them here.</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {orderItems.map(item => (
            <BillItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
          ))}
        </div>
      )}
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="space-y-2 text-gray-300">
          <div className="flex justify-between font-bold text-lg text-white">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button 
            onClick={onClear} 
            disabled={orderItems.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-red-900 disabled:cursor-not-allowed disabled:text-gray-400">
            Clear
          </button>
          <button 
            onClick={onPreview} 
            disabled={orderItems.length === 0}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-teal-800 disabled:cursor-not-allowed disabled:text-gray-400">
            Finalize Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;