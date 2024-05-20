import { Test, TestingModule } from '@nestjs/testing';
import { MercadoriaService } from 'src/services/mercadoria.service';


describe('MercadoriaService', () => {
  let service: MercadoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoriaService],
    }).compile();

    service = module.get<MercadoriaService>(MercadoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
