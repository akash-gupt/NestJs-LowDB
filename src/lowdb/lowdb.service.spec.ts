import { Test, TestingModule } from '@nestjs/testing';
import { LowdbService } from './lowdb.service';

describe('LowdbService', () => {
  let service: LowdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LowdbService],
    }).compile();

    service = module.get<LowdbService>(LowdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
