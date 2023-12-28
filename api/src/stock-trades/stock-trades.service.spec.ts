import { Test, TestingModule } from '@nestjs/testing'

import { StockTradesService } from './stock-trades.service'

describe('StockTradesService', () => {
  let service: StockTradesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockTradesService],
    }).compile()

    service = module.get<StockTradesService>(StockTradesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
