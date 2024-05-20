import { Test, TestingModule } from '@nestjs/testing';
import { Compra2Controller } from 'src/controllers/compra2.controller';
import { Compra2Service } from 'src/services/compra2.service';


describe('Compra2Controller', () => {
  let controller: Compra2Controller

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Compra2Controller],
      providers: [Compra2Service],
    }).compile();

    controller = module.get<Compra2Controller>(Compra2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
