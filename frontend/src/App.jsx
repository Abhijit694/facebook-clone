import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <SignUp/>
  }
])


const App = () => {
  return (
    <>
    <div>
      <RouterProvider router = {router} />
    </div>
    </>
  )
}

export default App