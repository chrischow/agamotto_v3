export interface GetAccountDetailsResponseDto {
  id: string
  openOptionsProfit: number
  realisedOptionsProfit: number
  realisedStocksProfit: number
  openStocksPosition: number
  numberOfOpenPutTrades: number
  numberOfClosedPutTrades: number
  numberOfOpenCallTrades: number
  numberOfClosedCallTrades: number
  numberOfOpenStockTrades: number
  numberOfClosedStockTrades: number
}
