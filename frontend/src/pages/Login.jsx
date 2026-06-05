import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const createAccHandler = (e) => {
    e.preventDefault()
    navigate('/register')
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
          <form className='flex flex-col items-center space-y-3'>
            <input
              type='text'
              placeholder='Email address'
              name='email'
              className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button className='bg-blue-700 text-white text-base font-bold py-2 rounded-lg hover:bg-blue-800 w-full'>Login</button>
            <Link className='text-blue-600 text-sm hover:underline'>Forgot password</Link>
            <hr className="my-2 text-gray-300 w-full"/>
            <button className=""></button>
            <button className='bg-green-600 text-white text-base font-bold py-2 rounded-lg hover:bg-green-700 w-full' onClick={(e) => {createAccHandler(e)}}>Create new account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login