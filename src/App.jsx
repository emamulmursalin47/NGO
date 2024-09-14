
import { Outlet } from 'react-router-dom'
import './App.css'
import SideNavbar from './component/sidebar/SideNavbar'
import MobileNav from './component/Navbar/MobileNav'
import Footer from './component/Footer'



function App() {
  const minHeightApp = { minHeight: `calc(100vh - 53px)` }
  return (
    <>
      <div className=' flex flex-col md:flex-row w-full  '>

        <div className=' md:min-h-screen  md:h-screen overflow-y-scroll no-scrollbar w-full md:w-1/5 '>
          <div className='hidden md:block'>
            <SideNavbar />
          </div>
          <div className='min-w-full block md:hidden'>
            <MobileNav />
          </div>
        </div>

        <div className=' w-full md:w-4/5'>
          <div className='h-screen overflow-y-scroll '>
            <div style={minHeightApp} >
              <Outlet />
            </div>
            <div className=''> <Footer /></div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
