import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'
import FriendsPage from './pages/FriendsPage'
import PhotosPage from './pages/PhotosPage'
import Reels from './pages/Reels'
import AllFriends from './components/AllFriends'
import FriendRequest from './components/FriendRequest'
import SentFriendRequest from './components/SentFriendRequest'


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Navbar/><Layout/></ProtectedRoute>,
  },
  {
    path: "/reels",
    element: <><Navbar/><Reels/></>
  },
  {
    path: "/friends",
    element: <><Navbar/><Friends/></>,
    children: [
      {
        index: true,  // Just keep this for /friends
        element: <AllFriends />
      },
      {
        path: "list",
        element: <AllFriends/>
      },
      {
        path: "requests",
        element: <FriendRequest/>
      },
      {
        path: "sent-requests",
        element: <SentFriendRequest/>
      },

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
    element: <ProtectedRoute>
      <Navbar/>
      <Profile/>
    </ProtectedRoute>,
    children: [
      {
        path: 'post',
        element: <PostPage/>
      },
      {
        path: 'about',
        element: <AboutPage/>
      },
      {
        path: 'friends',
        element: <FriendsPage/>
      },
      {
        path: 'photos',
        element: <PhotosPage/>
      }
    ]
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