import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSharedService } from './webpack-shared.service';

describe('WebpackSharedService', () => {
  let service: WebpackSharedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackSharedService],
    }).compile();

    service = module.get<WebpackSharedService>(WebpackSharedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
