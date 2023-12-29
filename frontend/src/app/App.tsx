import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Providers from './Providers'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={'login page'} />
          <Route element={'navbar'}>
            <Route path="/" element={'root (dashboard)'} />
            <Route path="/monitor" element={'monitor all positions'} />
            <Route path="/manage" element={'manage trades'} />
            <Route path="*" element={'404'} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
