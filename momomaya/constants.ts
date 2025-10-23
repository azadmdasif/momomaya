import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken',
    name: 'Chicken Momo',
    image: 'https://picsum.photos/seed/momo1/200',
    preparations: {
      steamed: { small: 60, medium: 80, large: 100 },
      fried: { small: 70, medium: 90, large: 110 },
    },
  },
  {
    id: 'paneer',
    name: 'Paneer Momo',
    image: 'https://picsum.photos/seed/momo3/200',
    preparations: {
      steamed: { small: 50, medium: 70, large: 90 },
      fried: { small: 60, medium: 80, large: 100 },
    },
  },
  {
    id: 'veg',
    name: 'Veg Momo',
    image: 'https://picsum.photos/seed/momo5/200',
    preparations: {
      steamed: { small: 40, medium: 60, large: 80 },
      fried: { small: 50, medium: 70, large: 90 },
    },
  },
];
