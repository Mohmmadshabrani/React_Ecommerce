import { useState } from 'react'
import '../../admincom/appadmin.css'
import Header from '../../admincom/Header'
import Sidebar from '../../admincom/Sidebar'
import ProductsDelete from './delete'




function Productsdelete() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <ProductsDelete />
      
    </div>
  )
}
  
  export default Productsdelete
