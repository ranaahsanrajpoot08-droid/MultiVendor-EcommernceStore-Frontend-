import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return setCart([]);
    const { data } = await api.get('/cart');
    setCart(data);
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    await api.post('/cart', { product_id: productId, quantity });
    fetchCart();
  };

  const updateCart = async (id, quantity) => {
    await api.put(`/cart/${id}`, { quantity });
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, c) => s + (c.product?.discount_price || c.product?.price || 0) * c.quantity, 0);

  return <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, clearCart, fetchCart, total }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);