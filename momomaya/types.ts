export type PreparationType = 'steamed' | 'fried' | 'normal' | 'peri-peri';
export type Size = 'small' | 'medium' | 'large';
export type PaymentMethod = 'Cash' | 'UPI' | 'Card';
export type Category = 'momo' | 'side' | 'drink';

export interface MenuItem {
  id: string; // e.g. 'chicken', 'veg'
  name: string; // e.g. 'Chicken Momo'
  image: string;
  category: Category;
  preparations: {
    [key in PreparationType]: {
      [key in Size]: number;
    };
  };
}

export interface OrderItem {
    id: string; // A unique ID for the variant, e.g., 'chicken-steamed-medium'
    menuItemId: string; // The ID of the base MenuItem, e.g. 'chicken-tandoori'
    name: string; // A descriptive name, e.g., 'Steamed Chicken Momo (Medium)'
    price: number;
    quantity: number;
    parentItemId?: string; // Links an add-on item to its parent
}

export interface CompletedOrder {
  id: string; // Unique ID for the transaction, e.g., timestamp
  billNumber: number;
  items: OrderItem[];
  total: number;
  date: string; // ISO string date
  paymentMethod: PaymentMethod;
  branchName: string;
  deletionInfo?: {
    reason: string;
    date: string; // ISO string date of deletion
  };
}