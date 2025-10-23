
import React from 'react';
import { OrderItem } from '../types';

interface BillItemProps {
  item: OrderItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

const BillItem: React.FC<BillItemProps> = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
      <div>
        <p className="font-medium text-white">{item.name}</p>
        <p className="text-sm text-gray-400">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-700 rounded">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
            className="px-2 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-l">-</button>
          <span className="px-3 text-white">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
            className="px-2 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-r">+</button>
        </div>
        <p className="w-16 text-right font-semibold text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BillItem;
