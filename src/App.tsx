import AppRoutes from './routes/AppRoutes';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;