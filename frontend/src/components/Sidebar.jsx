import friends from '../assets/friend.png'
import dashboard from '../assets/dashboard.png'
import feed from '../assets/feed.png'
import groups from '../assets/groups.png'
import market from '../assets/market.png'
import reels from '../assets/reel.png'
import { Link } from 'react-router-dom'
import userLogo from "../assets/fb-user-profile.jpg"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'




const menuItems = [
    {icon: friends, label: "Friends", click: "/friends"},
    {icon: groups, label: "Groups"},
    {icon: reels, label: "Reels"},
    {icon: market, label: "Marketplace"},
    {icon: feed, label: "Feeds"},
    {icon: dashboard, label: "Dashboard"}
]

const Sidebar = () => {

    const { user } = useSelector(store => store.auth)

  return (
    <div className="bg-[#f2f4f7] dark:bg-[#1b1b1c] text-black dark:text-gray-300 h-screen px-1 p-4 w-70 hidden md:block fixed top-0 left-0 mt-12">
        {/* top logo */}
        <Link to={`/profile/${user._id}`}>
            <div className='flex items-center cursor-pointer gap-4 mt-2 hover:bg-gray-200 px-3 rounded-lg py-2 dark:hover:bg-[#323233]'>
                <Avatar className='size-9'>
                    <AvatarImage src={user.profilePicture || userLogo} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-semibold text-black dark:text-gray-300'>{user.firstname} {user.lastname}</span>
            </div>
        </Link>

        {/* menu items */}
        <div className='flex flex-col'>
            {
                menuItems.map((item,index) => {
                    return (
                        <Link key={index} to={item.click}>
                            <div className='flex items-center gap-4 text-black dark:text-gray-700 hover:bg-gray-200 dark:hover:bg-[#323233] px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 '>

                                <img src={item.icon} className={item.label === "Dashboard" ? 'size-6.5 ml-1' : 'size-9'} />
                                <span className='font-semibold dark:text-gray-300 text-black'>{item.label}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
        <p className='absolute font-semibold bottom-16 pl-2 text-sm text-gray-400'>Privacy  .  Terms  .  Advertising  .  Ad choices  .  Cookies  .  Facelook © 2026</p>
    </div>
  )
}

export default Sidebar