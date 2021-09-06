import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSharedAspnetcoreService } from './webpack-shared-aspnetcore.service';

describe('WebpackSharedAspnetcoreService', () => {
  let service: WebpackSharedAspnetcoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackSharedAspnetcoreService],
    }).compile();

    service = module.get<WebpackSharedAspnetcoreService>(WebpackSharedAspnetcoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
