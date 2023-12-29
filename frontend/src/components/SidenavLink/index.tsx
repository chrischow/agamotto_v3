import { Button } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SidenavLink = ({
  icon,
  route,
  linkText,
}: {
  icon: ReactElement
  route: string
  linkText: string
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRouteSelected = location.pathname.split('/')[1] === route

  return (
    <Button
      width="100%"
      size={['sm', 'md']}
      leftIcon={icon}
      onClick={() => {
        navigate(`/${route}`)
      }}
      colorScheme={isRouteSelected ? 'purple' : undefined}
      variant={isRouteSelected ? 'solid' : 'ghost'}
      justifyContent="start"
    >
      {linkText}
    </Button>
  )
}

export default SidenavLink
