import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const monthNames = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

const SignUp = () => {

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  const [dobDay, setDobDay] = useState("")
  const [dobMonth, setDobMonth] = useState("")
  const [dobYear, setDobYear] = useState("")

  const updateDateOfBirth = (day,month,year) => {
    if(day && month && year){
      // convert month name to number (1,2,...,12)
      const monthMap = {
        Jan:'01', Feb:'02', Mar:'03', Apr:'04',
        May:'05', June:'06', July:'07', Aug:'08',
        Sept:'09', Oct:'10', Nov:'11', Dec:'12'
      }
      const monthNum = monthMap[month]
      const dob = `${year}-${monthNum}-${day.padStart(2,'0')}`  // yyyy-mm-dd
      setFormData((prev) => ({...prev,dateOfBirth: dob}))
    }
  }

  const handleChange = (e) => {
    const {name,value} = e.target

    if(!name){
      console.warn("Skipping change, no name:",e.target)
      return
    }
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auth/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )
      if(response.data.success){
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='h-screen flex flex-col gap-3 items-center justify-center'>
      <h1 className='text-blue-700 text-5xl font-bold text-center'>Facelook</h1>
      <div className='bg-white px-3 py-1 rounded-lg shadow-md w-full md:max-w-[450px] mx-1 md:mx-0'>
        <h2 className='text-xl font-semibold text-gray-800 text-center mb-1'>Create a new account</h2>
        <hr className='mb-2 text-gray-200' />
        <form onSubmit={handleSubmit} className='space-y-2 flex flex-col items-center p-3'>
          <div className='flex gap-3 md:w-full'>
            <input 
              type='text'
              placeholder='First Name'
              name='firstname'
              value={formData.firstname}
              onChange={handleChange}
              className='flex-1 p-2 border border-gray-300 rounded w-[180px]'
            />
            <input 
              type='text'
              placeholder='Last Name'
              name='lastname'
              value={formData.lastname}
              onChange={handleChange}
              className='flex-1 p-2 border border-gray-300 rounded w-[180px]'
            />
          </div>
          {/* Date of birth */}
          <div className='w-full'>
            <span className='text-sm text-gray-700'>Date of birth</span>
            <div className='flex gap-2 mt-1'>
              <select
                value={dobDay}
                onChange={(e) => {
                  setDobDay(e.target.value)
                  updateDateOfBirth(e.target.value,dobMonth,dobYear)
                }}
                className='p-2 border border-gray-300 rounded w-full'
              >
                <option value="">Day</option>
                {
                  [...Array(31)].map((_,i) => (
                    <option key={i} value={String(i+1).padStart(2,'0')}>{i+1}</option>
                  ))
                }
              </select>
              <select
                value={dobMonth}
                onChange={(e) => {
                  setDobMonth(e.target.value)
                  updateDateOfBirth(dobDay,e.target.value)
                }}
                className='p-2 border border-gray-300 rounded w-full'
              >
                <option value="">Month</option>
                {
                  monthNames.map((month,i) => (
                    <option key={i} value={month}>{month}</option>
                  ))
                }
              </select>
              <select
                value={dobYear}
                onChange={(e) => {
                  setDobYear(e.target.value)
                  updateDateOfBirth(dobDay,dobMonth,e.target.value)
                }}
                className="p-2 border border-gray-300 rounded w-full"
              >
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
                    {gender}
                    <input
                      type="radio"
                      id={gender}
                      name="gender"
                      value={gender.toLowerCase()}  // this is because the enum value of gender for user model is in lower case
                      checked={formData.gender === gender.toLowerCase()}
                      onChange={handleChange}
                    />
                  </label>
                ))
              }
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter email address"
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounder"
          />
          <input
            type="password"
            placeholder="Confirm password"
            name='confirmPass'
            value={formData.confirmPass}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button type="submit" className="bg-green-600 text-white text-base font-bold py-2 w-[200px] px-7 rounded-lg hover:bg-green-700 mt-1 cursor-pointer">Sign Up</button>
          <Link to={'/login'} className="text-blue-600 text-sm">Already have an account</Link>

        </form>
      </div>
    </div>
  )
}

export default SignUp