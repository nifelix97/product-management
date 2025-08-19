export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export const calculateCartTotals = (products: CartProduct[]) => {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
  const total = products.reduce((sum, item) => sum + item.total, 0);
  const discountedTotal = products.reduce((sum, item) => sum + item.discountedTotal, 0);

  return {
    totalProducts,
    totalQuantity,
    total,
    discountedTotal
  };
};

export const calculateProductTotals = (price: number, quantity: number, discountPercentage: number) => {
  const total = price * quantity;
  const discountedTotal = total * (1 - discountPercentage / 100);
  
  return {
    total,
    discountedTotal
  };
};

export type CartProductInput = { id: number; quantity: number };