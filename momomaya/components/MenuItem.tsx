
import React from 'react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onSelectItem: (item: MenuItemType) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onSelectItem }) => {
  const minPrice = Math.min(
    item.preparations.steamed.small,
    item.preparations.fried.small
  );

  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200 flex flex-col overflow-hidden"
      onClick={() => onSelectItem(item)}
      aria-label={`Select options for ${item.name}`}
    >
      <img src={item.image} alt={item.name} className="w-full h-24 sm:h-32 object-cover" />
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm sm:text-base text-white flex-grow">{item.name}</h3>
        <p className="text-gray-400 text-xs mt-1">Select options</p>
        <p className="text-teal-400 font-bold mt-2">From ₹{minPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MenuItem;
