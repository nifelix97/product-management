import { FiPackage, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className='bg-primary-50 border-t border-primary-200 mt-auto'>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <FiPackage className='text-primary-600 size-5' />
            <span className='text-primary-700 font-semibold'>Product Management</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="/" className="text-primary-600 hover:text-primary-800 transition-colors">
              Home
            </a>
            <a href="/categories" className="text-primary-600 hover:text-primary-800 transition-colors">
              Categories
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-primary-200 mt-4 pt-4 text-center">
          <p className='text-primary-600 text-sm'>Powered by React and Vite</p>
          <p className='text-primary-600 text-xs mt-1'>© 2025 Product Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}