import { type Product } from '../types/productType';
import { MdDelete, MdEdit, MdStarRate, MdVisibility } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useCartContext } from '../context/CartContext';
import { FaCartPlus } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
interface ProductCardProps {
  product: Product
  className?: string
  onProductUpdated?: () => void
}

export default function ProductCard({ product, className, onProductUpdated }: ProductCardProps) {
    const navigate = useNavigate();
    const { updateProduct, deleteProduct } = useProductContext();
    const [isDeleting, setIsDeleting] = useState(false);
    const { createCart } = useCartContext();
    const [adding, setAdding] = useState(false);
    const { user } = useUserContext();


        const handleCreateCart = async () => {
        setAdding(true);
        try {
            if (!user) {
                alert('You must be logged in to create a cart.');
                navigate('/');
                return;
            }
            await createCart({
                userId: user.id,
                products: [{ id: product.id, quantity: 1 }]
            });
            alert('Cart created with this product!');
        } catch {
            alert('Failed to create cart.');
        } finally {
            setAdding(false);
        }
    };

    const handleViewDetails = () => {
        navigate(`/product/${product.id}`);
    };

    const handleUpdate = () => {
        navigate(`/edit/${product.id}`);
    };

const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
        try {
            setIsDeleting(true);
            await deleteProduct(product.id);
            
            if (onProductUpdated) {
                onProductUpdated();
            }
            alert('Product deleted successfully!');
        } catch (error) {
            alert('Failed to delete product. Please try again.');
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    }
};

    return(
        <div className={` hover:border-primary-400 p-3 sm:p-4 lg:p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full flex flex-col ${className}`}>
            {product.thumbnail && (
                <div className="relative overflow-hidden rounded-md mb-3 sm:mb-4">
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.discountPercentage > 0 && (
                        <div className="absolute top-2 right-2  text-red-500 px-2 py-1 rounded-full text-xs font-semibold">
                            -{product.discountPercentage.toFixed(0)}%
                        </div>
                    )}
                    {/* {
                        <div className="absolute top-2 left-2 bg-primary-200 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {product.brand} 
                        </div>
                    } */}
                    
                </div>
            )}

            <div className="flex-1 flex flex-col">
                <h2 className=" sm:text-base lg:text-lg text-gray-800 hover:text-primary-700 transition-colors leading-tight mb-2 line-clamp-2">
                    {product.title}
                </h2>

                <div className="mb-3 sm:mb-4">
                    <span className='text-primary-600 text-lg sm:text-xl lg:text-2xl'>
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 mb-4'>
                    <div className='flex items-center'>
                        <div className='bg-gray-100 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize'>
                            {Array.isArray(product.category) ? String(product.category[0]) : String(product.category)}
                        </div>
                    </div>

                    <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='flex items-center bg-gray-100 px-2 py-1 rounded-full'>
                            <span className='text-gray-600 text-xs sm:text-sm'>
                                {product.stock} stock
                            </span>
                        </div>

                        <div className='flex items-center bg-secondary-200 px-2 py-1 rounded-full'>
                            <span className='text-gray-700 text-xs sm:text-sm font-medium mr-1'>
                                {product.rating.toFixed(1)}
                            </span>
                            <MdStarRate className='text-secondary-600 text-sm' />
                        </div>
                    </div>
                </div>

                <div className='mt-auto'>
                    <div className='flex sm:flex-row gap-2 sm:gap-3'>
                        <div className='flex sm:hidden gap-2'>
                         <button 
                        onClick={handleViewDetails} 
                            title="View Details"
                            
                            className='flex items-center justify-center text-primary-600 hover:text-primary-800 p-2 rounded transition'
                        >
                            <MdVisibility size={18} />
                        </button>
                        <button
                            onClick={handleUpdate}
                            title="Edit"
                            className='flex items-center justify-center text-primary-600 hover:text-primary-800 p-2 rounded transition'
                        >
                            <MdEdit size={18} />
                        </button>
                        <button
                            onClick={handleDelete}
                            title="Delete"
                            className='flex items-center justify-center text-red-600 hover:text-red-800 p-2 rounded transition'
                            disabled={isDeleting}
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>

                    <div className='hidden sm:flex'>
                        <button 
                        onClick={handleViewDetails} 
                            title="View Details"
                            
                            className='flex items-center justify-center text-primary-600 hover:text-primary-800 p-2 rounded transition'
                        >
                            <MdVisibility size={18} />
                        </button>
                        <button
                            onClick={handleUpdate}
                            title="Edit"
                            className='flex items-center justify-center text-primary-600 hover:text-primary-800 p-2 rounded transition'
                        >
                            <MdEdit size={18} />
                        </button>
                        <button
                            onClick={handleDelete}
                            title="Delete"
                            className='flex items-center justify-center text-red-600 hover:text-red-800 p-2 rounded transition'
                            disabled={isDeleting}
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>
                        <div className='flex-1 flex items-center justify-center'>
                              <button
                    onClick={handleCreateCart}
                    disabled={adding}
                    title="Create cart with this product"
                    className="p-2 rounded-full bg-primary-200  hover:bg-primary-200 text-white transition"
                >
                    <FaCartPlus size={18} />
                </button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}