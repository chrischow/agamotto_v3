export interface Stats {
  openOptionsProfit: number
  realisedOptionsProfit: number
  openStocksProfit: number
  realisedStocksProfit: number
  numOpenPuts: number
  numClosedPuts: number
  numOpenCalls: number
  numClosedCalls: number
  numOpenStockTrades: number
  numClosedStockTrades: number
}

export interface GetAccountDetailsResponseDto extends Stats {
  id: string
  tradeStats: {
    tickers: StatsByTicker[]
    profitHistory: ProfitHistory
  }
}

export interface ProfitHistory {
  [key: string]: {
    realised: {
      options: number
      stocks: number
    }
    open: {
      options: number
      stocks: number
    }
  }
}

export interface StatsByTicker extends Stats {
  ticker: string
}

export interface TradeStats {
  tickers: StatsByTicker[]
  profitHistory: ProfitHistory
}
