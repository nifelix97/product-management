import ListCategories from '../components/ListCategories'
import Layout from '../components/Layout'
export default function CategoryPage() {
  return (
    <Layout>
      <div className='container mx-auto p-4'>
      <ListCategories />
      </div>
    </Layout>
  )
}

