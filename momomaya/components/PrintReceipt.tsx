import React from 'react';
import { OrderItem, PaymentMethod } from '../types';

interface PrintReceiptProps {
  orderItems: OrderItem[];
  billNumber?: number | null;
  paymentMethod?: PaymentMethod | null;
  branchName?: string | null;
  date?: string | Date | null;
}

const PrintReceipt: React.FC<PrintReceiptProps> = ({ orderItems, billNumber, paymentMethod, branchName, date }) => {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const transactionDate = date ? new Date(date) : new Date();

  // Inline styles for thermal printer compatibility
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      fontFamily: 'monospace',
      color: '#000',
      backgroundColor: '#fff',
      padding: '2mm',
      fontSize: '9pt'
    },
    centerText: { textAlign: 'center' },
    header: { fontWeight: 'bold', fontSize: '14pt' },
    line: { borderTop: '1px dashed #000', margin: '4px 0' },
    table: { width: '100%', fontSize: '9pt', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left',
      fontWeight: 'bold',
      paddingBottom: '2px',
      borderBottom: '1px dashed #000',
    },
    td: {
      verticalAlign: 'top',
      padding: '2px 0',
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '12pt',
      marginTop: '4px',
    },
    wordBreak: { wordBreak: 'break-all' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.centerText}>
        <svg className="w-10 h-10 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12.5C18 16.0376 15.3137 19 12 19C8.68629 19 6 16.0376 6 12.5C6 9 12 6.5 12 6.5C12 6.5 18 9 18 12.5Z M12 6.5C11.5 8 10 8.5 9 9.5 M12 6.5C12.5 8 14 8.5 15 9.5 M10 4.5C10.5 3.5 11 3 12 3C13 3 13.5 3.5 14 4.5 M11 2C11.5 1.5 12 1 12 1C12 1 12.5 1.5 13 2" />
        </svg>
        <h1 style={styles.header}>Momomaya</h1>
        <p>Have Momo, beat FOMO</p>
        {branchName && <p style={{fontWeight: 'bold'}}>{branchName}</p>}
      </div>
      <div style={styles.line}></div>
      <div>
        {billNumber && <p>Bill No: {billNumber}</p>}
        <p>Date: {transactionDate.toLocaleDateString()}</p>
        <p>Time: {transactionDate.toLocaleTimeString()}</p>
        {paymentMethod && <p>Payment: {paymentMethod}</p>}
      </div>
      <div style={styles.line}></div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{...styles.th, width: '45%'}}>Item</th>
            <th style={{...styles.th, textAlign: 'center'}}>Qty</th>
            <th style={{...styles.th, textAlign: 'right'}}>Price</th>
            <th style={{...styles.th, textAlign: 'right'}}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td style={{...styles.td, ...styles.wordBreak}}>{item.name}</td>
              <td style={{...styles.td, textAlign: 'center'}}>{item.quantity}</td>
              <td style={{...styles.td, textAlign: 'right'}}>{item.price.toFixed(2)}</td>
              <td style={{...styles.td, textAlign: 'right'}}>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.line}></div>
      <div style={styles.total}>
        <span>TOTAL:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <div style={styles.line}></div>
      <div style={{...styles.centerText, marginTop: '8px'}}>
        <p>Thank you for your visit!</p>
        <p>Come back soon!</p>
      </div>
    </div>
  );
};

export default PrintReceipt;