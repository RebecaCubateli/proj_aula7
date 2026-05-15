import { Test, TestingModule } from '@nestjs/testing';
import { PraticaService } from './pratica.service';

describe('PraticaService', () => {
  let service: PraticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PraticaService],
    }).compile();

    service = module.get<PraticaService>(PraticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
