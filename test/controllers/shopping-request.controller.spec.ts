import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingRequestController } from 'src/controllers/shopping-request.controller';
import { ShoppingRequestService } from 'src/services/shopping-request.service';


describe('ShoppingRequestController', () => {
  let controller: ShoppingRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingRequestController],
      providers: [ShoppingRequestService],
    }).compile();

    controller = module.get<ShoppingRequestController>(ShoppingRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
