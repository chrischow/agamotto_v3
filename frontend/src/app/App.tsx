import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedPage from '../components/ProtectedPage'
import LoginPage from '../pages/Login'
import Providers from './Providers'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route element={'navbar'}> */}
          <Route
            path="/"
            element={<ProtectedPage element={<>root (dashboard)</>} />}
          />
          <Route
            path="/monitor"
            element={<ProtectedPage element={<>monitor all positions</>} />}
          />
          <Route
            path="/manage"
            element={<ProtectedPage element={<>manage trades</>} />}
          />
          <Route path="*" element={<ProtectedPage element={<>404</>} />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
