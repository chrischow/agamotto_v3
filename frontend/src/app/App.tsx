import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedPage from '../components/ProtectedPage'
import WithNav from '../components/WithNav'
import LoginPage from '../pages/login'
import ManagePage from '../pages/manage'
import Providers from './Providers'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<WithNav />}>
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
              element={<ProtectedPage element={<ManagePage />} />}
            />
            <Route path="*" element={<ProtectedPage element={<>404</>} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
