import React from 'react';
import { OrderItem } from '../types';

interface PrintReceiptProps {
  orderItems: OrderItem[];
  billNumber?: number | null;
}

const PrintReceipt: React.FC<PrintReceiptProps> = ({ orderItems, billNumber }) => {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currentDate = new Date();

  return (
    <div className="w-48 mx-auto p-1 bg-white text-black font-mono text-xs print-container">
      <div className="text-center">
        {/* Momo Icon */}
        <svg className="w-10 h-10 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12C4 12 6.5 9 10 9C13.5 9 15.5 7 19 7C22.5 7 20 12 20 12C20 12 16.5 13 14 14C11.5 15 4 12 4 12Z" />
          <path d="M10 9C10 9 9.5 7.5 10 7C10.5 6.5 12 6.5 12.5 7C13 7.5 13.5 9 13.5 9" />
          <path d="M13 9C13 9 12.5 7.5 13 7C13.5 6.5 15 6.5 15.5 7C16 7.5 16.5 9 16.5 9" />
        </svg>
        <h1 className="font-bold text-base">Momomaya</h1>
        <p className="text-[10px]">Have Momo, beat FOMO</p>
        <p className="text-[10px]">Asansol</p>
      </div>
      <div className="border-b border-dashed border-black my-1"></div>
      <div className="my-1">
        {billNumber && <p>Bill No: {billNumber}</p>}
        <p>Date: {currentDate.toLocaleDateString()}</p>
        <p>Time: {currentDate.toLocaleTimeString()}</p>
      </div>
      <div className="border-b border-dashed border-black my-1"></div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-dashed border-black">
            <th className="text-left font-semibold pb-1 w-[45%] text-black">Item</th>
            <th className="text-center font-semibold pb-1 text-black">Qty</th>
            <th className="text-right font-semibold pb-1 text-black">Price</th>
            <th className="text-right font-semibold pb-1 text-black">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-1 break-words align-top text-black">{item.name}</td>
              <td className="text-center align-top text-black">{item.quantity}</td>
              <td className="text-right align-top text-black">{item.price.toFixed(2)}</td>
              <td className="text-right align-top text-black">{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-b border-dashed border-black my-1"></div>
      <div className="mt-1">
        <div className="flex justify-between font-bold text-sm">
          <span>TOTAL:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <div className="border-b border-dashed border-black my-1"></div>
      <div className="text-center mt-2 text-[10px]">
        <p>Thank you for your visit!</p>
        <p>Come back soon!</p>
      </div>
    </div>
  );
};

export default PrintReceipt;