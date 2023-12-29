import { Outlet } from 'react-router-dom'

import BoxContainer from './BoxContainer'
import Navbar from './Navbar'

const WithTopNav = () => {
  return (
    <>
      <Navbar />
      <BoxContainer>
        <Outlet />
      </BoxContainer>
    </>
  )
}

export default WithTopNav
