import Layout from '../components/Layout';
import ProductList from '../components/ListProduct';
export default function HomePage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <ProductList />
      </div>
    </Layout>
  );
}