
import { MenuItem, OrderItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'platter',
    name: 'Momomaya Must Try Platter',
    image: 'https://images.picxy.com/cache/2021/5/26/f33738dc75574a81b72c0d8c164b4a77.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 70, medium: 85, large: 100 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'chicken',
    name: 'Chicken Momo',
    image: 'https://static.toiimg.com/thumb/60275824.cms?imgsize=1041917&width=800&height=800',
    category: 'momo',
    preparations: {
      steamed: { small: 40, medium: 60, large: 75 },
      fried: { small: 50, medium: 70, large: 85 },
      normal: { small: -1, medium: -1, large: -1 }, // Dummy
      'peri-peri': { small: -1, medium: -1, large: -1 }, // Dummy
    },
  },
  {
    id: 'paneer',
    name: 'Paneer Momo',
    image: 'https://www.mrcoconut.in/img/products/23_10_2021_15_53_506_pm.webp',
    category: 'momo',
    preparations: {
      steamed: { small: 40, medium: 60, large: 75 },
      fried: { small: 50, medium: 70, large: 85 },
      normal: { small: -1, medium: -1, large: -1 }, // Dummy
      'peri-peri': { small: -1, medium: -1, large: -1 }, // Dummy
    },
  },
  {
    id: 'veg',
    name: 'Veg Momo',
    image: 'https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/veg-momos/veg-momos.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: 30, medium: 50, large: 60 },
      fried: { small: 40, medium: 60, large: 70 },
      normal: { small: -1, medium: -1, large: -1 }, // Dummy
      'peri-peri': { small: -1, medium: -1, large: -1 }, // Dummy
    },
  },
  {
    id: 'chicken-tandoori',
    name: 'Chicken Tandoori Momo',
    image: 'https://jeyporedukaan.in/wp-content/uploads/2024/12/tandoori-momo-scaled.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 60, medium: 85, large: 100 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'kurkure-chicken',
    name: 'Chicken Kurkure Momo',
    image: 'https://cafe21.in/wp-content/uploads/2025/07/1686068321785_SKU-2082_0.jpeg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 60, medium: 85, large: 100 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
    {
    id: 'chicken-pan-fried',
    name: 'Chicken Pan Fried Momo',
    image: 'https://c.ndtvimg.com/2023-06/a87vfc6o_chicken-panfried-momos_625x300_28_June_23.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 60, medium: 85, large: 100 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'cheese-lovers-combo',
    name: 'Cheese Lovers Combo',
    image: 'https://patelcafenrestro.com/wp-content/uploads/2024/08/DM-2024-08-06T163007.734.png', 
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 75, medium: -1, large: -1 }, 
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'premium-chicken-cheese-lava',
    name: 'Premium Chicken Cheese Lava Momo',
    image: 'https://img.thecdn.in/17132/1607351667375_SKU-0125_0.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 90, medium: -1, large: -1 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'premium-corn-cheese-lava',
    name: 'Premium Corn Cheese Lava Momo',
    image: 'https://english.cdn.zeenews.com/sites/default/files/2025/05/08/1744609-untitled-design.png',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 90, medium: -1, large: -1 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'fries',
    name: 'French Fries',
    image: 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
    category: 'side',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 40, medium: 40, large: 40 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
  {
    id: 'tandoori-mayonnaise',
    name: 'Tandoori Mayonnaise',
    image: 'https://www.nutralite.com/wp-content/uploads/2024/07/Page-7-7.-Page-URL_-https_www.nutralite.com_blog_10-creative-ways-to-use-tandoori-mayonnaise-in-everyday-cooking_-.jpg',
    category: 'side',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 10, medium: 10, large: 10 },
      'peri-peri': { small: -1, medium: -1, large: -1 },
    },
  },
];

export const BRANCHES = ['OK Road', 'Jahangir Mohalla'];

export const FRIES_ADD_ON_ITEM: OrderItem = {
  id: 'fries-add-on',
  menuItemId: 'fries',
  name: 'French Fries (Half Price)',
  price: 20,
  quantity: 1,
};

export const TANDOORI_MAYO_ORDER_ITEM: OrderItem = {
  id: 'tandoori-mayonnaise',
  menuItemId: 'tandoori-mayonnaise',
  name: 'Tandoori Mayonnaise',
  price: 10,
  quantity: 1,
};
