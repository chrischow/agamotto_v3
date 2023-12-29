import { createContext, ReactNode, useContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface AuthContextProps {
  user: string
  isLoggedIn: boolean
  redirectUrl: string
  login: (user: string) => void
  logout: () => void
  setRedirectUrl: (redirectUrl: string) => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: '',
  isLoggedIn: false,
  redirectUrl: '',
  login: () => {},
  logout: () => {},
  setRedirectUrl: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<string>('USER', '')
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>(
    'IS_LOGGED_INTO_AGAMOTTO',
    false,
  )
  const [redirectUrl, setRedirectUrl] = useLocalStorage<string>(
    'REDIRECT_URL',
    '',
  )

  const login = (name: string) => {
    setUser(name)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, redirectUrl, login, logout, setRedirectUrl }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
