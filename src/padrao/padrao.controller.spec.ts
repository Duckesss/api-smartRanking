import { Test, TestingModule } from '@nestjs/testing';
import { PadraoController } from './padrao.controller';

describe('PadraoController', () => {
  let controller: PadraoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PadraoController],
    }).compile();

    controller = module.get<PadraoController>(PadraoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
