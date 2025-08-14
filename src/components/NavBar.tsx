import { useState } from 'react';
import { FiPackage } from "react-icons/fi";
import { CiHome } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-primary-50 p-4 shadow-md fixed w-full z-10'>
      <div className='flex justify-between items-center'>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded">
            <FiPackage className='text-primary-50 size-6' />
          </div>
          <h1 className='text-primary-700 text-xl sm:text-2xl font-semibold ml-2'>
            <span className="hidden sm:inline">Product Management</span>
            <span className="sm:hidden">PM</span>
          </h1>
        </div>

        <nav className='hidden md:block'>
          <ul className='flex space-x-6'>
            <li className='flex items-center space-x-2 hover:bg-primary-100 px-3 py-2 rounded-md transition-colors'>
              <CiHome className='text-primary-600 hover:text-primary-800 size-6' />
              <a href="/" className='text-primary-600 hover:text-primary-800 font-medium'>Home</a>
            </li>
            {/* <li className='flex items-center space-x-2 hover:bg-primary-100 px-3 py-2 rounded-md transition-colors'>
              <AiOutlineProduct className='text-primary-600 hover:text-primary-800 size-6' />
              <a href="/products" className='text-primary-600 hover:text-primary-800 font-medium'>Products</a>
            </li> */}
            <li className='flex items-center space-x-2 hover:bg-primary-100 px-3 py-2 rounded-md transition-colors'>
              <TbCategoryPlus className='text-primary-600 hover:text-primary-800 size-6' />
              <a href="/categories" className='text-primary-600 hover:text-primary-800 font-medium'>Categories</a>
            </li>
          </ul>
        </nav>

        <button 
          className='md:hidden text-primary-600 hover:text-primary-800 focus:outline-none'
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className='md:hidden mt-4 pb-4 border-t border-primary-200'>
          <nav className='mt-4'>
            <ul className='space-y-2'>
              <li>
                <a 
                  href="/" 
                  className='flex items-center space-x-3 text-primary-600 hover:text-primary-800 hover:bg-primary-100 px-3 py-3 rounded-md transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CiHome size={20} />
                  <span className='font-medium'>Home</span>
                </a>
              </li>
              {/* <li>
                <a 
                  href="/products" 
                  className='flex items-center space-x-3 text-primary-600 hover:text-primary-800 hover:bg-primary-100 px-3 py-3 rounded-md transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AiOutlineProduct size={20} />
                  <span className='font-medium'>Products</span>
                </a>
              </li> */}
              <li>
                <a 
                  href="/categories" 
                  className='flex items-center space-x-3 text-primary-600 hover:text-primary-800 hover:bg-primary-100 px-3 py-3 rounded-md transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TbCategoryPlus size={20} />
                  <span className='font-medium'>Categories</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}