import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPackage } from "react-icons/fi";
import { CiHome } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import { FcSearch } from "react-icons/fc";


interface NavBarProps {
  onSearch?: (query: string) => void;
}

export default function NavBar({ onSearch }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className='bg-primary-50 p-4 shadow-md fixed w-full z-10'>
      <div className='flex justify-between items-center'>
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded">
            <FiPackage className='text-primary-50 size-6' />
          </div>
          <h1 className='text-primary-700 text-xl sm:text-2xl font-semibold ml-2'>
            <span className="hidden sm:inline">Product Management</span>
            <span className="sm:hidden">PM</span>
          </h1>
        </Link>

        {location.pathname === '/' && (
          <div className='hidden md:block w-96'>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search products..."
                className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FcSearch size={20} />
              </span>
            </div>
          </div>
        )}

        <nav className='hidden md:block'>
          <ul className='flex space-x-6'>
            <li className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isActive('/') ? 'bg-primary-200 text-primary-800' : 'hover:bg-primary-100'
            }`}>
              <CiHome className='text-primary-600 hover:text-primary-800 size-6' />
              <Link to="/" className='text-primary-600 hover:text-primary-800 font-medium'>
                Home
              </Link>
            </li>
            <li className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isActive('/categories') ? 'bg-primary-200 text-primary-800' : 'hover:bg-primary-100'
            }`}>
              <TbCategoryPlus className='text-primary-600 hover:text-primary-800 size-6' />
              <Link to="/categories" className='text-primary-600 hover:text-primary-800 font-medium'>
                Categories
              </Link>
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
          {location.pathname === '/' && (
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FcSearch size={20} />
                </span>
              </div>
            </div>
          )}

          <nav className='mt-4'>
            <ul className='space-y-2'>
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors font-medium ${
                    isActive('/') 
                      ? 'bg-primary-200 text-primary-800' 
                      : 'text-primary-600 hover:text-primary-800 hover:bg-primary-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CiHome size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors font-medium ${
                    isActive('/categories') 
                      ? 'bg-primary-200 text-primary-800' 
                      : 'text-primary-600 hover:text-primary-800 hover:bg-primary-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TbCategoryPlus size={20} />
                  <span>Categories</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}