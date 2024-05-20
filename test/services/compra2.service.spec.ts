import { Test, TestingModule } from '@nestjs/testing';
import { Compra2Service } from 'src/services/compra2.service';


describe('Compra2Service', () => {
  let service: Compra2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Compra2Service],
    }).compile();

    service = module.get<Compra2Service>(Compra2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
