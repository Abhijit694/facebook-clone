import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]: value})
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/login',
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )
      if(response.data.success){
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createAccHandler = (e) => {
    e.preventDefault()
    navigate('/signup')
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='flex flex-col md:flex-row md:max-w-5xl gap-10 space-y-10 md:space-y-0 md:space-x-10'>
        {/* left side */}
        <div className='flex-1 flex flex-col justify-center mb-20'>
          <h1 className='text-blue-600 text-6xl font-bold'>Facelook</h1>
        </div>
        {/* right side */}
        <div className='bg-whte p-6 rounded-lg shadow-md md:w-[400px]'>
          <form onSubmit={loginHandler} className='flex flex-col items-center space-y-3'>
            <input
              type='text'
              placeholder='Email address'
              name='email'
              value={formData.email}
              onChange={(e) => {handleChange(e)}}
              className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={(e) => {handleChange(e)}}
              className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type="submit" className='bg-blue-700 text-white text-base font-bold py-2 rounded-lg hover:bg-blue-800 w-full'>Login</button>
            <Link className='text-blue-600 text-sm hover:underline'>Forgot password</Link>
            <hr className="my-2 text-gray-300 w-full"/>
            <button className='bg-green-600 text-white text-base font-bold py-2 rounded-lg hover:bg-green-700 w-full' onClick={(e) => {createAccHandler(e)}}>Create new account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login