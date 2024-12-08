import React from "react";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, onRemove }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">${price?.toFixed(2) || '0.00'}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onRemove(id)} 
          className="px-3 py-1 text-red-600 border border-red-300 rounded-lg hover:bg-red-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
