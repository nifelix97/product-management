import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InPuts from '../../components/InPut'
import { useUserContext } from '../../context/UserContext'

export default function Login() {
  const navigate = useNavigate()
  const { loginUser, loading } = useUserContext()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)

    const formErrors: { username?: string; password?: string } = {}
    if (!formData.username) {
      formErrors.username = 'Username is required'
    }
    if (!formData.password) {
      formErrors.password = 'Password is required'
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      const user = await loginUser(formData.username, formData.password)
      if (user) {
        setFormData({ username: '', password: '' })
        setErrors({})
        navigate('/home')
      } else {
        setLoginError('Invalid credentials')
      }
    } catch (err) {
      setLoginError('Invalid credentials or server error')
    }
  }

  return (
  <div className="relative flex min-h-screen bg-primary-300 overflow-x-hidden">
    <div className="flex-1 bg-primary-700 flex items-center justify-center rounded-r-full z-0">
        
      </div>

    <div className="hidden lg:flex flex-1 items-center justify-center bg-primary-500 rounded-l-full z-0"></div>

    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90vw] max-w-xl px-2">

      <div className="w-full bg-opacity-95 rounded-lg shadow-xl border border-gray-300 dark:border-gray-600 p-4 sm:p-6">
        <div className="text-center text-white">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4">Welcome to PM</h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-200">e-commerce Management System</p>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 text-primary-50 text-center">Please Login!!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InPuts
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full ${errors.username ? 'border-red-500' : 'border-primary-300'}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-6">
            <InPuts
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full ${errors.password ? 'border-red-500' : 'border-primary-300'}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
          </div>
          {loginError && <div className="text-red-500 text-center mb-2">{loginError}</div>}
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center">
            <a href="#" className="text-xs sm:text-sm text-primary-50 hover:text-primary-70">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
)

}