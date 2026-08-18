import Navbar from '../components/Navbar'
import MidHome from '@/components/MidHome'
import SponsorsSidebar from '@/components/SponsorsSidebar'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex gap-7 bg-[#f2f4f7] dark:bg-[#1b1b1c]'>
        <MidHome/>
        <SponsorsSidebar/>
      </div>
    </div>
  )
}

export default Home