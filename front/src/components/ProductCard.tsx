import React from "react";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    addToCart: () => void;
}

const ProductCard:React.FC<ProductCardProps> = ({ name, price, image, addToCart }) => {
  return (
    <div className="flex flex-col items-center justify-center w-64 h-96 bg-gray-100 rounded-lg shadow-md">
      <img src={"http://"+window.location.hostname+":1337"+image} alt={name} className="w-48 h-48 rounded-md" />
      <h2 className="text-xl font-semibold py-2">{name}</h2>
      {/* <p className="text-sm text-gray-600 pb-2">{description}</p> */}
      <p className="text-lg font-semibold">${price}</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition" onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
