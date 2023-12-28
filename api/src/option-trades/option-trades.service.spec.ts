import { Test, TestingModule } from '@nestjs/testing'

import { OptionTradesService } from './option-trades.service'

describe('OptionTradesService', () => {
  let service: OptionTradesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionTradesService],
    }).compile()

    service = module.get<OptionTradesService>(OptionTradesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
