import { Link } from "react-router-dom"

const monthNames = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

const SignUp = () => {
  return (
    <div className='h-screen flex flex-col gap-3 items-center justify-center'>
      <h1 className='text-blue-600 text-5xl font-bold text-center'>Facelook</h1>
      <div className='bg-white px-3 py-1 rounded-lg shadow-md w-full md:max-w-[450px] mx-1 md:mx-0'>
        <h2 className='text-xl font-semibold text-gray-800 text-center mb-1'>Create a new account</h2>
        <hr className='mb-2 text-gray-200' />
        <form className='space-y-2 flex flex-col items-center p-3'>
          <div className='flex gap-3 md:w-full'>
            <input 
              type='text'
              placeholder='First Name'
              name='firstname'
              className='flex-1 p-2 border border-gray-300 rounded w-[180px]'
            />
            <input 
              type='text'
              placeholder='Last Name'
              name='lastname'
              className='flex-1 p-2 border border-gray-300 rounded w-[180px]'
            />
          </div>
          {/* Date of birth */}
          <div className='w-full'>
            <span className='text-sm text-gray-700'>Date of birth</span>
            <div className='flex gap-2 mt-1'>
              <select className='p-2 border border-gray-300 rounded w-full'>
                <option value="">Day</option>
                {
                  [...Array(31)].map((_,i) => (
                    <option key={i} value={String(i+1).padStart(2,'0')}>{i+1}</option>
                  ))
                }
              </select>
              <select className='p-2 border border-gray-300 rounded w-full'>
                <option value="">Month</option>
                {
                  monthNames.map((month,i) => (
                    <option key={i} value={month}>{month}</option>
                  ))
                }
              </select>
              <select className="p-2 border border-gray-300 rounded w-full">
                <option value="">Year</option>
                {
                  [...Array(50)].map((_,i) => (
                    <option key={i} vlaue={String(2025 - i)}>{2025 - i}</option>
                  ))
                }
              </select>
            </div>
          </div>
          {/* Gender */}
          <div className="w-full">
            <span className="text-sm font-semibold text-gray-700" >Gender</span>
            <div className="flex gap-3 mt-1">
              {
                ["Male","Female","Other"].map((gender) => (
                  <label htmlFor={gender} key={gender} className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 w-full cursor-pointer">
                    {gender} <input type="radio" id={gender} name="gender" value={gender} />
                  </label>
                ))
              }
            </div>
          </div>
          <input type="text" placeholder="Enter email address" className="w-full p-2 border border-gray-300 rounded" name="email"/>
          <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounder" name="password" />
          <input type="password" placeholder="Confirm password" className="w-full p-2 border border-gray-300 rounded" name="confirmPassword" />

          <button className="bg-green-600 text-white text-base font-bold py-1 w-[200px] px-7 rounded hover:bg-green-700 mt-1 cursor-pointer">Sign Up</button>
          <Link to={'/login'} className="text-blue-600 text-sm">Already have an account</Link>

        </form>
      </div>
    </div>
  )
}

export default SignUp