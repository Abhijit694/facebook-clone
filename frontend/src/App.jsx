import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'


const router = createBrowserRouter([
  {
    path: '/',
    element: <><ProtectedRoute><Home/></ProtectedRoute></>
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