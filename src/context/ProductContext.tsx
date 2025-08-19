import { createContext, useContext, type ReactNode } from 'react';
import { useProductsAxios } from '../hooks/useProductsAxios';
import type { Product } from '../types/productType';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: any;
  categories: any[];
  fetchProducts: () => void;
  getProduct: (id: number) => Promise<Product>;
  fetchCategories: () => void;
  getCategories: () => Promise<any[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  searchProducts: (query: string) => Promise<Product[]>;
  createProduct: (product: Omit<Product, 'id'>) => Promise<Product>;

}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const hookData = useProductsAxios();

  return (
    <ProductContext.Provider value={hookData}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return context;
}