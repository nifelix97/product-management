import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SingleProductPage from '../pages/SingleProductPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<SingleProductPage />} />
    </Routes>
  )
}
