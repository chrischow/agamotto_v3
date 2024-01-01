import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedPage from '../components/ProtectedPage'
import WithNav from '../components/WithNav'
import LoginPage from '../pages/login'
import ManagePage from '../pages/manage'
import StrategyDetailPage from '../pages/manage/[strategyId]'
import OptionTradeDetailPage from '../pages/manage/[strategyId]/options/[optionTradeId]'
import StockTradeDetailPage from '../pages/manage/[strategyId]/stocks/[stockTradeId]'
import Dashboard from '../pages/root'
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
              element={<ProtectedPage element={<Dashboard />} />}
            />
            <Route
              path="/monitor"
              element={<ProtectedPage element={<>monitor all positions</>} />}
            />
            <Route
              path="/manage"
              element={<ProtectedPage element={<ManagePage />} />}
            />
            <Route
              path="/manage/:strategyId"
              element={<ProtectedPage element={<StrategyDetailPage />} />}
            />
            <Route
              path="/manage/:strategyId/options/:optionTradeId"
              element={<ProtectedPage element={<OptionTradeDetailPage />} />}
            />
            <Route
              path="/manage/:strategyId/stocks/:stockTradeId"
              element={<ProtectedPage element={<StockTradeDetailPage />} />}
            />
            <Route path="*" element={<ProtectedPage element={<>404</>} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
