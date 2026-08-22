import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Friends from './pages/Friends'
import Profile from './pages/Profile'


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/friends',
        element:<Friends/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <SignUp/>
  },
  {
    path: '/profile/:id',
    element: <Profile/>
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