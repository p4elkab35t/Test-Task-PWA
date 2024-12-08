import React from "react";

import ProductCard from "../components/ProductCard";

interface ProductInfoWindowProps {
    name: string;
    price: number;
    description: string;
    image: string;
}

const ProductInfoWindow: React.FC<ProductInfoWindowProps> = (data) => {
    return (
        <div className="flex flex-col items-center justify-center w-64 h-96 bg-gray-100 rounded-lg shadow-md">
            <img src={data.image} alt={data.name} className="w-48 h-48 rounded-full" />
            <h2 className="text-xl font-semibold py-2">{data.name}</h2>
            <p className="text-sm text-gray-600 pb-2">{data.description}</p>
            <p className="text-lg font-semibold">${data.price}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition">Add to Cart</button>
        </div>
    );
} 

export default ProductInfoWindow;