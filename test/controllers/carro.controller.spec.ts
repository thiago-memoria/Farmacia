import { Test, TestingModule } from '@nestjs/testing';
import { CarroController } from 'src/controllers/carro.controller';
import { CarroService } from 'src/services/carro.service';


describe('CarroController', () => {
  let controller: CarroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarroController],
      providers: [CarroService],
    }).compile();

    controller = module.get<CarroController>(CarroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
