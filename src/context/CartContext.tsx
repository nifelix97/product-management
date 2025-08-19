import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Cart, CartProductInput } from '../types/cartType';
import { useCartAxios } from '../hooks/useCartAxios';
import type { AxiosError } from 'axios';

interface CartContextType {
  carts: Cart[];
  loading: boolean;
  error: AxiosError<unknown, any> | null;
  fetchCarts: () => Promise<void>;
  getCartById: (id: number) => Promise<Cart | null>;
  getCartsByUserId: (userId: number) => Promise<Cart[]>;
  deleteCart: (id: number) => Promise<void>;
  updateCart: (id: number, updatedCart: Partial<Cart>) => Promise<void>;
  createCart: (newCart: { userId: number; products: CartProductInput[] }) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const hookData = useCartAxios();

  useEffect(() => {
    hookData.fetchCarts();
  }, []);

  return (
    <CartContext.Provider value={hookData}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}