import AppRoutes from './routes/AppRoutes';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';



function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;