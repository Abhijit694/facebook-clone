import friends from '../assets/friend.png'
import dashboard from '../assets/dashboard.png'
import feed from '../assets/feed.png'
import groups from '../assets/groups.png'
import market from '../assets/market.png'
import reels from '../assets/reel.png'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'




const menuItems = [
    {icon: friends, label: "Friends", click: "/friends"},
    {icon: dashboard, label: "Dashboard"},
    {icon: feed, label: "Feeds"},
    {icon: groups, label: "Groups"},
    {icon: market, label: "Marketplace"},
    {icon: reels, label: "Reels"}
]

const Sidebar = () => {
  return (
    <div className="dark:bg-[#1b1b1c] bg-[#f2f4f7] text-black dark:text-gray-300 h-screen px-1 p-4 w-80 hidden md:block fixed top-0 left-0 mt-12">
        {/* top logo */}
        <Link>
            <div className='flex items-center cursor-pointer gap-4 mt-2 hover:bg-gray-200 px-3 rounded-lg py-2 dark:hover:bg-[#323233]'>
                <Avatar>
                    <AvatarImage/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar