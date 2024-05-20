import { Test, TestingModule } from '@nestjs/testing';
import { MercadoriaController } from 'src/controllers/mercadoria.controller';
import { MercadoriaService } from 'src/services/mercadoria.service';


describe('MercadoriaController', () => {
  let controller: MercadoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoriaController],
      providers: [MercadoriaService],
    }).compile();

    controller = module.get<MercadoriaController>(MercadoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
