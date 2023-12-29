import { useMediaQuery } from '@chakra-ui/react'

import WithSidenav from './WithSidenav'
import WithTopNav from './WithTopnav'

const WithNav = () => {
  const [isMobileView] = useMediaQuery('(max-width: 800px)')

  if (isMobileView) {
    return <WithTopNav />
  }
  return <WithSidenav />
}

export default WithNav
