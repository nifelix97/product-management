import { type Product } from '../types/productType';
import { MdStarRate } from "react-icons/md";
import Button from './Button';
import SingleProductPage from '../pages/SingleProductPage';
import { useNavigate } from 'react-router-dom';



interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className}: ProductCardProps) {
    const navigate = useNavigate();

        const handleViewDetails = () => {
        navigate(`/product/${product.id}`);
    };

    return(
        <div className={`border-b-primary-400 p-2 sm:p-4 rounded-lg shadow-md ${className}`}>
            {
            product.thumbnail && (
                <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-32 sm:h-40 md:h-48 object-cover mb-2 sm:mb-4 rounded-md"
                />
            )
            }
            <h2 className="text-sm sm:text-lg font-semibold hover:text-primary-700">{product.title}</h2>
            <div className='mt-2 sm:mt-4'>
                <span className='text-primary-500 font-bold text-lg sm:text-xl'>${product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
          <span className='text-red-500 text-xs sm:text-sm ml-2'>-{product.discountPercentage}%</span>
        )}
        <div className='flex justify-between'>
        <div className='flex h-6 justify-center items-center rounded-full bg-primary-100 px-1 sm:px-2 py-3'>
            <p className='text-white text-xs sm:text-sm p-2 sm:p-4'>{product.category}</p>
        </div>
        <div className='flex items-center flex-col'>
         <div className='flex items-center rounded-full bg-secondary-700 px-1 sm:px-2 py-1 mb-2'>
            <p className='text-gray-500 text-xs sm:text-sm'>{product.stock} in stock</p>
         </div>
        <div className='flex items-center rounded-full bg-secondary-200 px-1 sm:px-2 py-1'>
        <p className='text-gray-500 text-xs sm:text-sm flex items-center'>{product.rating}<MdStarRate className='text-secondary-600 inline' /></p>
        </div>
        </div>
        </div>
        <Button label="View Details" onClick={handleViewDetails} />
            </div>
        </div>
    )
}