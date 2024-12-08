import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setCart } from '../features/cartSlice'; // A Redux action to update cart state

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:1337', { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Connected to Strapi WebSocket server');
    });

    // Listen for updates related to the cart or product changes
    socket.on('user:update', (updatedCart) => {
      console.log('Cart updated:', updatedCart);
      dispatch(setCart(updatedCart)); // Dispatch action to update Redux state
    });

    socket.on('product:update', (updatedProduct) => {
      console.log('Product updated:', updatedProduct);
      // Handle product update (e.g., notify user, update local state)
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

export default useSocket;
