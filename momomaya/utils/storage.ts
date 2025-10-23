import { CompletedOrder, OrderItem } from '../types';

const ALL_ORDERS_KEY = 'momo-pos-orders';
const LAST_BILL_NUMBER_KEY = 'momo-pos-last-bill-number';

/**
 * Retrieves all completed orders from localStorage.
 * @returns An array of CompletedOrder objects.
 */
export function getAllOrders(): CompletedOrder[] {
  try {
    const data = localStorage.getItem(ALL_ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Could not parse orders from localStorage", error);
    return [];
  }
}

/**
 * Gets the next bill number without incrementing it.
 * @returns The next bill number to be used.
 */
export function peekNextBillNumber(): number {
  const lastBillNumber = localStorage.getItem(LAST_BILL_NUMBER_KEY);
  return lastBillNumber ? parseInt(lastBillNumber, 10) + 1 : 1;
}

/**
 * Saves a new completed order to localStorage with a new bill number.
 * @param orderItems The items in the order.
 * @param total The calculated total.
 */
export function saveCompletedOrder(orderItems: OrderItem[], total: number) {
  const allOrders = getAllOrders();
  const nextBillNumber = peekNextBillNumber();
  
  const newOrder: CompletedOrder = {
    id: Date.now().toString(),
    billNumber: nextBillNumber,
    items: orderItems,
    total,
    date: new Date().toISOString(),
  };

  allOrders.push(newOrder);

  try {
    localStorage.setItem(ALL_ORDERS_KEY, JSON.stringify(allOrders));
    localStorage.setItem(LAST_BILL_NUMBER_KEY, nextBillNumber.toString());
  } catch (error) {
    console.error("Could not save order to localStorage", error);
  }
}

/**
 * Retrieves all orders that occurred on a specific date.
 * @param dateStr The date in 'YYYY-MM-DD' format.
 * @returns An array of CompletedOrder objects for the given date.
 */
export function getOrdersForDate(dateStr: string): CompletedOrder[] {
    const allOrders = getAllOrders();
    return allOrders.filter(order => order.date.startsWith(dateStr));
}

/**
 * Finds a single order by its bill number.
 * @param billNumber The bill number to search for.
 * @returns The CompletedOrder object if found, otherwise null.
 */
export function getOrderByBillNumber(billNumber: number): CompletedOrder | null {
  const allOrders = getAllOrders();
  return allOrders.find(order => order.billNumber === billNumber) || null;
}