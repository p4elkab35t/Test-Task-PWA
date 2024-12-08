import React from "react";
import NavUI from "../components/Nav.UI";
import ProductCard from "../components/ProductCard";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetProductsQuery, useAddToCartMutation } from '../features/apiSlice';

const ProductCatalogPage: React.FC = () => {

  const { data: products, error, isLoading } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();

  const authState = useSelector((state: RootState) => state.auth) as { user: { id: string } };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const handleAddToCart = async (productId: string) => {
    try {
      console.log(authState?.user?.id);
      const response = await addToCart({ userId: authState?.user?.id, product: { id: productId } }).unwrap();
      console.log(response)
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  };


  return (
    <>
    <NavUI />
    <div className="flex gap-10 p-8">
    {products?.data.map((product: any) => (
        <ProductCard
          key={product.id}
          name={product.Title}
          price={product.Price}
          image={product.Image[0].url}
          addToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
    </>
  );
};

export default ProductCatalogPage;