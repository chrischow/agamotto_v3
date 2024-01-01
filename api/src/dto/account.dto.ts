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
  tickers: StatsByTicker[]
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
