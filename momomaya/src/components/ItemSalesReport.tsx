
import React, { useMemo, useState } from 'react';
import { CompletedOrder } from '../types';

interface ItemSalesReportProps {
  orders: CompletedOrder[];
}

interface SalesData {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

type SortKey = 'name' | 'quantity' | 'revenue';
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const ItemSalesReport: React.FC<ItemSalesReportProps> = ({ orders }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'quantity', direction: 'descending' });

  const salesData = useMemo<SalesData[]>(() => {
    const itemMap = new Map<string, { name: string; quantity: number; revenue: number }>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = itemMap.get(item.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += item.quantity * item.price;
        } else {
          itemMap.set(item.id, {
            name: item.name,
            quantity: item.quantity,
            revenue: item.quantity * item.price,
          });
        }
      });
    });
    
    // convert map to array
    return Array.from(itemMap.entries()).map(([id, data]) => ({ id, ...data }));
  }, [orders]);

  const sortedSalesData = useMemo(() => {
    let sortableItems = [...salesData];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [salesData, sortConfig]);
  
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    } else if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) {
        return ' ↕';
    }
    return sortConfig.direction === 'descending' ? ' ▼' : ' ▲';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6 border border-brand-brown/10">
      <h3 className="text-xl font-semibold mb-4 border-b border-brand-brown/10 pb-2">Item Sales Report</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-brand-brown/5 text-xs text-brand-brown/60 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 cursor-pointer select-none" onClick={() => requestSort('name')}>
                Item Name {getSortIndicator('name')}
              </th>
              <th scope="col" className="px-4 py-3 text-center cursor-pointer select-none" onClick={() => requestSort('quantity')}>
                Quantity Sold {getSortIndicator('quantity')}
              </th>
              <th scope="col" className="px-4 py-3 text-right cursor-pointer select-none" onClick={() => requestSort('revenue')}>
                Total Revenue {getSortIndicator('revenue')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSalesData.map(item => (
              <tr key={item.id} className="border-b border-brand-brown/10 hover:bg-brand-brown/5">
                <td className="px-4 py-3 font-medium text-brand-brown">{item.name}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right font-semibold">₹{item.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedSalesData.length === 0 && <p className="text-center py-8 text-brand-brown/60">No sales data found for this date range.</p>}
      </div>
    </div>
  );
};

export default ItemSalesReport;
