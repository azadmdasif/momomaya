export type PreparationType = 'steamed' | 'fried';
export type Size = 'small' | 'medium' | 'large';

export interface MenuItem {
  id: string; // e.g. 'chicken', 'veg'
  name: string; // e.g. 'Chicken Momo'
  image: string;
  preparations: {
    [key in PreparationType]: {
      [key in Size]: number;
    };
  };
}

export interface OrderItem {
    id: string; // A unique ID for the variant, e.g., 'chicken-steamed-medium'
    name: string; // A descriptive name, e.g., 'Steamed Chicken Momo (Medium)'
    price: number;
    quantity: number;
}

export interface CompletedOrder {
  id: string; // Unique ID for the transaction, e.g., timestamp
  billNumber: number;
  items: OrderItem[];
  total: number;
  date: string; // ISO string date
}