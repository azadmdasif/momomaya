import React, { useState, useEffect, useMemo } from 'react';
import { getOrdersForDate, getOrderByBillNumber } from '../utils/storage';
import { CompletedOrder } from '../types';
import PrintReceipt from './PrintReceipt';

const getTodaysDateString = () => new Date().toISOString().split('T')[0];

const Analytics: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodaysDateString());
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundOrder, setFoundOrder] = useState<CompletedOrder | null>(null);
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    setOrders(getOrdersForDate(selectedDate));
  }, [selectedDate]);

  const handleSearch = () => {
    setFoundOrder(null);
    if (!searchTerm.trim()) {
      setSearchMessage('Please enter a bill number.');
      return;
    }
    const billNum = parseInt(searchTerm, 10);
    if (isNaN(billNum)) {
      setSearchMessage('Invalid bill number. Please enter numbers only.');
      return;
    }
    const order = getOrderByBillNumber(billNum);
    if (order) {
      setFoundOrder(order);
      setSearchMessage('');
    } else {
      setSearchMessage(`Bill number #${billNum} was not found.`);
    }
  };

  const { totalRevenue, totalItemsSold, aggregatedItems, averageOrderValue } = useMemo(() => {
    let revenue = 0;
    let itemsSold = 0;
    const itemMap = new Map<string, { name: string; quantity: number; revenue: number }>();
    orders.forEach(order => {
      revenue += order.total;
      order.items.forEach(item => {
        itemsSold += item.quantity;
        const existing = itemMap.get(item.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += item.price * item.quantity;
        } else {
          itemMap.set(item.id, { name: item.name, quantity: item.quantity, revenue: item.price * item.quantity });
        }
      });
    });
    const sortedItems = Array.from(itemMap.values()).sort((a, b) => b.revenue - a.revenue);
    const avgOrderValue = orders.length > 0 ? revenue / orders.length : 0;
    return { totalRevenue: revenue, totalItemsSold: itemsSold, aggregatedItems: sortedItems, averageOrderValue: avgOrderValue };
  }, [orders]);

  return (
    <div className="p-4 md:p-6 bg-gray-900 h-full text-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        {/* Search Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Find a Bill</h3>
          <div className="flex gap-2">
            <input type="search" placeholder="Enter Bill Number..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="flex-grow bg-gray-700 text-white rounded p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button onClick={handleSearch} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors">Search</button>
          </div>
          {searchMessage && <p className="text-red-400 text-sm mt-2">{searchMessage}</p>}
          {foundOrder && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-bold mb-2">Found Bill #{foundOrder.billNumber}</h4>
              <div className="bg-white rounded p-2 mx-auto w-fit">
                 <PrintReceipt orderItems={foundOrder.items} billNumber={foundOrder.billNumber} />
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
          <MetricCard title="Total Orders" value={orders.length.toString()} />
          <MetricCard title="Total Items Sold" value={totalItemsSold.toString()} />
          <MetricCard title="Avg. Order Value" value={`₹${averageOrderValue.toFixed(2)}`} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Best-Selling Items Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-700 text-xs text-gray-300 uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3">Item Name</th>
                    <th scope="col" className="px-4 py-3 text-center">Qty</th>
                    <th scope="col" className="px-4 py-3 text-right">Revenue</th>
                    <th scope="col" className="px-4 py-3 text-right">Revenue %</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregatedItems.length > 0 ? (
                    aggregatedItems.map(item => (
                      <tr key={item.name} className="border-b border-gray-700 hover:bg-gray-600/50">
                        <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">₹{item.revenue.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-teal-400 font-semibold">{totalRevenue > 0 ? `${((item.revenue / totalRevenue) * 100).toFixed(1)}%` : '0.0%'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center py-8 text-gray-400">No sales recorded for this date.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Top Items by Revenue</h3>
             <div className="space-y-3 pt-2">
                {aggregatedItems.length > 0 ? aggregatedItems.slice(0, 5).map(item => (
                    <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-300 truncate pr-2">{item.name}</span>
                            <span className="font-semibold text-white">₹{item.revenue.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: totalRevenue > 0 ? `${(item.revenue / totalRevenue) * 100}%` : '0%' }}></div>
                        </div>
                    </div>
                )) : <p className="text-center py-8 text-gray-400">No data for chart.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <p className="text-3xl font-semibold text-teal-400">{value}</p>
  </div>
);

export default Analytics;