import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingRequestService } from 'src/services/shopping-request.service';


describe('ShoppingRequestService', () => {
  let service: ShoppingRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingRequestService],
    }).compile();

    service = module.get<ShoppingRequestService>(ShoppingRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
