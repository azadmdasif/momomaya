
import React, { useState, useMemo } from 'react';
import { MenuItem, OrderItem, PreparationType, Size } from '../types';

interface VariantSelectionModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddItem: (item: OrderItem) => void;
}

const VariantSelectionModal: React.FC<VariantSelectionModalProps> = ({ item, onClose, onAddItem }) => {
  const [selectedPrep, setSelectedPrep] = useState<PreparationType>('steamed');
  const [selectedSize, setSelectedSize] = useState<Size>('medium');

  // Reset state when a new item is selected
  React.useEffect(() => {
    if (item) {
      setSelectedPrep('steamed');
      setSelectedSize('medium');
    }
  }, [item]);
  
  const currentPrice = useMemo(() => {
    if (!item) return 0;
    return item.preparations[selectedPrep][selectedSize];
  }, [item, selectedPrep, selectedSize]);

  if (!item) return null;

  const handleAddItem = () => {
    const orderItem: OrderItem = {
      id: `${item.id}-${selectedPrep}-${selectedSize}`,
      name: `${selectedPrep.charAt(0).toUpperCase() + selectedPrep.slice(1)} ${item.name} (${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)})`,
      price: currentPrice,
      quantity: 1,
    };
    onAddItem(orderItem);
    onClose();
  };

  const prepTypes: PreparationType[] = ['steamed', 'fried'];
  const sizes: Size[] = ['small', 'medium', 'large'];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-white overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4"/>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Preparation</h3>
            <div className="flex gap-2">
              {prepTypes.map(prep => (
                <button
                  key={prep}
                  onClick={() => setSelectedPrep(prep)}
                  className={`flex-1 py-2 rounded transition-colors ${selectedPrep === prep ? 'bg-teal-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {prep.charAt(0).toUpperCase() + prep.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
               {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-2 rounded transition-colors ${selectedSize === size ? 'bg-teal-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-teal-400">₹{currentPrice.toFixed(2)}</span>
            <button 
              onClick={handleAddItem}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Add to Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantSelectionModal;
