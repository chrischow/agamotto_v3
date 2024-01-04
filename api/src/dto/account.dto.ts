export interface GetAccountDetailsResponseDto {
  id: string
  openOptionsProfit: number
  realisedOptionsProfit: number
  openStocksProfit: number
  realisedStocksProfit: number
  numberOfOpenPutTrades: number
  numberOfClosedPutTrades: number
  numberOfOpenCallTrades: number
  numberOfClosedCallTrades: number
  numberOfOpenStockTrades: number
  numberOfClosedStockTrades: number
  tradeStats: {
    tickers: StatsByTicker[]
    profitHistory: ProfitHistory
  }
}

export interface ProfitHistory {
  [key: string]: number
}

export interface StatsByTicker {
  ticker: string
  openOptionsProfit: number
  realisedOptionsProfit: number
  openStocksProfit: number
  realisedStocksProfit: number
  numberOfOpenPutTrades: number
  numberOfClosedPutTrades: number
  numberOfOpenCallTrades: number
  numberOfClosedCallTrades: number
  numberOfOpenStockTrades: number
  numberOfClosedStockTrades: number
}

export interface TradeStats {
  tickers: StatsByTicker[]
  profitHistory: ProfitHistory
}
