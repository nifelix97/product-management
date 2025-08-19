import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SingleProductPage from '../pages/SingleProductPage';
import CategoryPage from '../pages/CategoryPage';
import ProductCategory from '../pages/productCategory';
import EditProductPage from '../pages/EditProductPage';
import AddProductPage from '../pages/AddProductPage';
import CartPage from '../pages/CartPage';
import SinglecartPage from '../pages/SinglecartPage';
import UserCartsPage from '../pages/UserCartsPage';
import EditCartPage from '../pages/EditCartPage';
import CreateCartPage from '../pages/CreateCartPage';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<SingleProductPage />} />
      <Route path='/categories' element={<CategoryPage />} />
      <Route path='/category/:category' element={<ProductCategory />} />
      <Route path='/edit/:id' element={<EditProductPage />} />
      <Route path='/add' element={<AddProductPage />} /> 
      <Route path='/cart' element={<CartPage />} />
      <Route path='/cart/:id' element={<SinglecartPage />} />
      <Route path="/user/:userId/carts" element={<UserCartsPage />} />
      <Route path="/cart/:id/edit" element={<EditCartPage />} />
      <Route path="/cart/create" element={<CreateCartPage />} />
    </Routes>
  )
}
