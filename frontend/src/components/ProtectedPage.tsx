import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { ReactElement, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/auth-context'

const ProtectedPage = ({ element }: { element: ReactElement }) => {
  const authContext = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const displayToast = (message: string) => {
    toast({
      position: 'bottom',
      status: 'error',
      variant: 'subtle',
      description: message,
      duration: 3000,
      isClosable: true,
    })
  }

  const onError = (error: any) => {
    if (error instanceof AxiosError) {
      const status = error.request.status

      switch (status) {
        case 401:
          displayToast('Please log in to view this page.')
          authContext.logout()
          navigate('/login')
          break
        case 403:
          displayToast('You are not authorised to view this resource.')
          navigate('/')
          break
        case 500:
          displayToast('Server error. Please refresh the page and try again.')
          navigate('/')
          break
        default:
          displayToast('An unknown error occurred.')
          navigate('/')
      }
    }
  }

  useEffect(() => {
    if (!authContext.isLoggedIn) {
      const isNotRoot = window.location.pathname !== '/'
      if (isNotRoot) {
        displayToast('Please log in to view this page.')
      }
      navigate(
        `/login${isNotRoot ? `?redirect=${window.location.pathname}` : ''}`,
      )
    } else {
      if (authContext.redirectUrl) {
        navigate(authContext.redirectUrl)
        authContext.setRedirectUrl('')
      }
    }
  }, [authContext, navigate])

  return (
    <ErrorBoundary fallbackRender={() => <>fallback</>} onError={onError}>
      {element}
    </ErrorBoundary>
  )
}

export default ProtectedPage
