import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { useGetCartQuery, useRemoveFromCartMutation } from '../features/apiSlice';
import { setCart, removeFromCart } from '../features/cartSlice';
import CartItem from '../components/CartItem';
import NavUI from '../components/Nav.UI';

type CartItemType = {
  id: number;
  Title: string;
  Price: number;
};

type CartRelationalType = {
  id: number;
};


const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice) || 0;
  const authState = useSelector((state: RootState) => state.auth) as { user: { id: string } };
  const userId = authState?.user?.id;

  const { data: cart, error, isLoading, refetch } = useGetCartQuery(userId || '', {
    skip: !userId,
  });

  const [removeFromCartMutation] = useRemoveFromCartMutation();

  useEffect(() => {
    if (cart?.Cart?.[0]?.products && Array.isArray(cart.Cart[0].products)) {
      console.log(cart.Cart[0].products);
      dispatch(setCart({ Cart: cart.Cart[0].products }));
    } else {
      dispatch(setCart({ Cart: [] }));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [userId, refetch]);

  const handleRemoveFromCart = async (productId: number) => {
    if (!userId) return;
    console.log('Removing product from cart:', productId);

    try {
      const localCart = cart?.Cart[0].products.filter((item: CartItemType) => item.id !== productId);
      const localCartToUpdate = localCart.map((item: CartItemType) => ({ id: item.id }));
      const remRes = await removeFromCartMutation({ userId, localCartToUpdate}).unwrap();
      console.log(remRes);
      dispatch(removeFromCart(productId));
    } catch (err) {
      console.error('Failed to remove product from cart:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart</div>;
  if (!cart?.Cart) return <div>No cart data available</div>;

  return (
    <>
      <NavUI />
      <Link 
        to="/products" 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition absolute top-20 left-3"
      >
        &larr; Back to products
      </Link>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-xl font-bold mb-6">Your Cart</h1>
        {(!cart.Cart[0].products || cart.Cart[0].products.length === 0) && <p>Your cart is empty</p>}
        {cart.Cart[0].products && cart.Cart[0].products.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.Title}
            price={item.Price || 0}
            onRemove={handleRemoveFromCart}
          />
        ))}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Subtotal</h2>
          <div className="flex flex-row justify-between items-baseline">
            <p className="text-xl">${totalPrice?.toFixed(2) || '0.00'}</p>
            {cart.Cart[0].products && cart.Cart[0].products.length > 0 && (
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;