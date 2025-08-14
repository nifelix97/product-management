import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SingleProductPage from '../pages/SingleProductPage';
import CategoryPage from '../pages/CategoryPage';
import ProductCategory from '../pages/productCategory';
import EditProductPage from '../pages/EditProductPage';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<SingleProductPage />} />
      <Route path='/categories' element={<CategoryPage />} />
      <Route path='/category/:category' element={<ProductCategory />} />
      <Route path='/edit/:id' element={<EditProductPage />} />
    </Routes>
  )
}
