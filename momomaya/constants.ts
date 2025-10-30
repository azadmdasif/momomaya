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
      'peri-peri': { small: 80, medium: 95, large: 110 },
    },
    costs: {
        normal: { small: 28, medium: 34, large: 40 },
        'peri-peri': { small: 32, medium: 38, large: 44 },
    }
  },
  {
    id: 'chicken',
    name: 'Chicken Momo',
    image: 'https://static.toiimg.com/thumb/60275824.cms?imgsize=1041917&width=800&height=800',
    category: 'momo',
    preparations: {
      steamed: { small: 40, medium: 50, large: 65 },
      fried: { small: 50, medium: 60, large: 75 },
      normal: { small: -1, medium: -1, large: -1 },
      'peri-peri': { small: 50, medium: 60, large: 75 },
    },
    costs: {
        steamed: { small: 16, medium: 24, large: 32 },
        fried: { small: 20, medium: 30, large: 40 },
        'peri-peri': { small: 19, medium: 27, large: 35 },
    }
  },
  {
    id: 'paneer',
    name: 'Paneer Momo',
    image: 'https://www.mrcoconut.in/img/products/23_10_2021_15_53_506_pm.webp',
    category: 'momo',
    preparations: {
      steamed: { small: 40, medium: 60, large: 80 },
      fried: { small: 50, medium: 70, large: 90 },
      normal: { small: -1, medium: -1, large: -1 },
      'peri-peri': { small: 50, medium: 70, large: 90 },
    },
    costs: {
        steamed: { small: 16, medium: 24, large: 32 },
        fried: { small: 20, medium: 30, large: 40 },
        'peri-peri': { small: 19, medium: 27, large: 35 },
    }
  },
  {
    id: 'veg',
    name: 'Veg Momo',
    image: 'https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/veg-momos/veg-momos.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: 30, medium: 40, large: 50 },
      fried: { small: 40, medium: 50, large: 60 },
      normal: { small: -1, medium: -1, large: -1 },
      'peri-peri': { small: 40, medium: 50, large: 60 },
    },
    costs: {
        steamed: { small: 12, medium: 18, large: 24 },
        fried: { small: 16, medium: 24, large: 32 },
        'peri-peri': { small: 15, medium: 21, large: 27 },
    }
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
      'peri-peri': { small: 70, medium: 95, large: 105 },
    },
    costs: {
        normal: { small: 22, medium: 33, large: 44 },
        'peri-peri': { small: 25, medium: 36, large: 47 },
    }
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
      'peri-peri': { small: 70, medium: 95, large: 110 },
    },
    costs: {
        normal: { small: 22, medium: 33, large: 44 },
        'peri-peri': { small: 25, medium: 36, large: 47 },
    }
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
      'peri-peri': { small: 70, medium: 95, large: 110 },
    },
    costs: {
        normal: { small: 20, medium: 30, large: 40 },
        'peri-peri': { small: 23, medium: 33, large: 43 },
    }
  },
  {
    id: 'cheese-lovers-combo',
    name: 'Cheese Lovers Combo',
    image: 'https://patelcafenrestro.com/wp-content/uploads/2024/08/DM-2024-08-06T163007.734.png', 
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 75, medium: 100, large: 120 }, 
      'peri-peri': { small: 85, medium: 110, large: 130 },
    },
    costs: {
        normal: { small: 30, medium: 45, large: 60 },
        'peri-peri': { small: 33, medium: 48, large: 63 },
    }
  },
  {
    id: 'premium-chicken-cheese-lava',
    name: 'Premium Chicken Cheese Lava Momo',
    image: 'https://img.thecdn.in/17132/1607351667375_SKU-0125_0.jpg',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 75, medium: 100, large: 120 },
      'peri-peri': { small: 85, medium: 110, large: 130 },
    },
    costs: {
        normal: { small: 30, medium: 45, large: 60 },
        'peri-peri': { small: 33, medium: 48, large: 63 },
    }
  },
  {
    id: 'premium-corn-cheese-lava',
    name: 'Premium Corn Cheese Lava Momo',
    image: 'https://english.cdn.zeenews.com/sites/default/files/2025/05/08/1744609-untitled-design.png',
    category: 'momo',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 75, medium: 100, large: 120 },
      'peri-peri': { small: 85, medium: 110, large: 130 },
    },
    costs: {
        normal: { small: 30, medium: 45, large: 60 },
        'peri-peri': { small: 33, medium: 48, large: 63 },
    }
  },
  {
    id: 'fries',
    name: 'French Fries',
    image: 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
    category: 'side',
    preparations: {
      steamed: { small: -1, medium: -1, large: -1 },
      fried: { small: -1, medium: -1, large: -1 },
      normal: { small: 40, medium: 55, large: 65 },
      'peri-peri': { small: 50, medium: 65, large: 75 },
    },
    costs: {
        normal: { small: 10, medium: 15, large: 20 },
        'peri-peri': { small: 13, medium: 18, large: 23 },
    }
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
    costs: {
        normal: { small: 3, medium: 3, large: 3 },
    }
  },
];

export const BRANCHES = ['OK Road', 'Jahangir Mohalla', 'Asansol Station'];

export const FRIES_ADD_ON_ITEM: OrderItem = {
  id: 'fries-add-on',
  menuItemId: 'fries',
  name: 'French Fries (Half Price)',
  price: 20,
  cost: 5,
  quantity: 1,
};

export const TANDOORI_MAYO_ORDER_ITEM: OrderItem = {
  id: 'tandoori-mayonnaise',
  menuItemId: 'tandoori-mayonnaise',
  name: 'Tandoori Mayonnaise',
  price: 10,
  cost: 3,
  quantity: 1,
};
