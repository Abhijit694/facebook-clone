import Home from '@/pages/Home'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className='flex justify-between'>
        <Sidebar/>
        <div>
            <Home/>
        </div>
    </div>
  )
}

export default Layout