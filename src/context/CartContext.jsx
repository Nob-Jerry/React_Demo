import { createContext, useContext, useState, useEffect } from "react";
import { getCartItem } from "../service/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  // cart?.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const cartCount = cart?.length || 0;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedCartId = localStorage.getItem("cartId");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedCartId) {
      setCartId(Number(storedCartId));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized && cartId) {
      localStorage.setItem("cartId", cartId.toString());
    }
  }, [cartId, isInitialized]);

  const refreshCart = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.userId) return;

      const cartItems = await getCartItem(storedUser.userId);
      setCart(cartItems); 
    } catch (err) {
      console.error("Lỗi khi refreshCart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartId, setCartId, cartCount, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
