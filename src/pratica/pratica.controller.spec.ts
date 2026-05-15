import { Test, TestingModule } from '@nestjs/testing';
import { PraticaController } from './pratica.controller';

describe('PraticaController', () => {
  let controller: PraticaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PraticaController],
    }).compile();

    controller = module.get<PraticaController>(PraticaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
