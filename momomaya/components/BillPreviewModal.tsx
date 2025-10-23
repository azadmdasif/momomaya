import React from 'react';
import { OrderItem } from '../types';
import PrintReceipt from './PrintReceipt';

interface BillPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderItems: OrderItem[];
  billNumber: number | null;
}

const BillPreviewModal: React.FC<BillPreviewModalProps> = ({ isOpen, onClose, onConfirm, orderItems, billNumber }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm text-white overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Receipt Preview</h2>
          <div className="bg-white rounded-md p-2 max-h-96 overflow-y-auto">
            <PrintReceipt orderItems={orderItems} billNumber={billNumber} />
          </div>
        </div>
        <div className="bg-gray-700 p-4 grid grid-cols-2 gap-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
            Close
          </button>
          <button onClick={onConfirm} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Confirm & Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillPreviewModal;