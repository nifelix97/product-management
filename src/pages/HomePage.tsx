import Button from '../components/Button';
import Layout from '../components/Layout';
import ProductList from '../components/ListProduct';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className='mt-16 text-right p-4'>
          <Button label="Add Product" onClick={() => navigate('/')} />
        </div>
        <ProductList />
      </div>
    </Layout>
  );
}