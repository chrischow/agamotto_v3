import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../../api/auth'
import Brand from '../../components/Brand'
import { useAuth } from '../../context/auth-context'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authContext = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate('/')
    }
  }, [])

  return (
    <Center height="100vh" width="100vw">
      <VStack width="300px">
        <Brand fontSize="xxx-large" />
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
            focusBorderColor="purple.400"
            type="email"
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
            focusBorderColor="purple.400"
            type="password"
          />
        </FormControl>
        <Button
          mt={4}
          width="100%"
          colorScheme="purple"
          onClick={async () => {
            try {
              await login({ email, password })
              authContext.login(email)
              navigate('/')
            } catch (error) {
              toast({
                position: 'bottom',
                status: 'error',
                description: 'Invalid username or password.',
                isClosable: true,
                duration: 3000,
              })
            }
          }}
        >
          Login
        </Button>
      </VStack>
    </Center>
  )
}

export default LoginPage
