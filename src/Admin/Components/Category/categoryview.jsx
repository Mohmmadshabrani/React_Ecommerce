import { useState } from 'react'
import '../../admincom/appadmin.css'
import Header from '../../admincom/Header'
import Sidebar from '../../admincom/Sidebar'
import CategoryView from './get'




function Categoryview() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <CategoryView />
      
    </div>
  )
}
  
  export default Categoryview
