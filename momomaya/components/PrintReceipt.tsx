import React from 'react';
import { OrderItem } from '../types';

interface PrintReceiptProps {
  orderItems: OrderItem[];
  billNumber?: number | null;
  branchName?: string | null;
}

const PrintReceipt: React.FC<PrintReceiptProps> = ({ orderItems, billNumber, branchName }) => {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currentDate = new Date();

  return (
    <div
      className="mx-auto bg-white text-black font-mono text-[10px] leading-tight print-container"
      style={{
        width: '58mm',           // match roll width
        padding: '4px',
        wordBreak: 'break-word',
      }}
    >
      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-1">
        <svg
          className="w-8 h-8 mx-auto mb-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 12.5C18 16.0376 15.3137 19 12 19C8.68629 19 6 16.0376 6 12.5C6 9 12 6.5 12 6.5C12 6.5 18 9 18 12.5Z M12 6.5C11.5 8 10 8.5 9 9.5 M12 6.5C12.5 8 14 8.5 15 9.5 M10 4.5C10.5 3.5 11 3 12 3C13 3 13.5 3.5 14 4.5 M11 2C11.5 1.5 12 1 12 1C12 1 12.5 1.5 13 2"
          />
        </svg>
        <h1 className="font-bold text-sm">Momomaya</h1>
        <p className="text-[9px]">Have Momo, beat FOMO</p>
        {branchName && (
          <p className="text-[9px] font-semibold mt-0.5">{branchName}</p>
        )}
      </div>

      <div className="border-b border-dashed border-black my-1"></div>

      {/* ---------- BILL INFO ---------- */}
      <div className="mb-1">
        {billNumber && <p>Bill No: {billNumber}</p>}
        <p>Date: {currentDate.toLocaleDateString()}</p>
        <p>Time: {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="border-b border-dashed border-black my-1"></div>

      {/* ---------- ITEMS ---------- */}
      <table className="w-full text-[10px]">
        <thead>
          <tr className="border-b border-dashed border-black">
            <th className="text-left pb-1">Item</th>
            <th className="text-center pb-1 w-[10%]">Qty</th>
            <th className="text-right pb-1 w-[15%]">Rate</th>
            <th className="text-right pb-1 w-[20%]">Amt</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-[1px] align-top">{item.name}</td>
              <td className="text-center align-top">{item.quantity}</td>
              <td className="text-right align-top">{item.price.toFixed(2)}</td>
              <td className="text-right align-top">
                {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed border-black my-1"></div>

      {/* ---------- TOTAL ---------- */}
      <div className="flex justify-between font-bold text-[11px]">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="border-t border-dashed border-black my-1"></div>

      {/* ---------- FOOTER ---------- */}
      <div className="text-center mt-1 text-[9px]">
        <p>Thank you for your visit!</p>
        <p>Come back soon!</p>
      </div>
    </div>
  );
};

export default PrintReceipt;
