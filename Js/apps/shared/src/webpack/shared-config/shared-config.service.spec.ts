import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSharedConfigService } from './webpack-shared-config.service';

describe('WebpackSharedConfigService', () => {
  let service: WebpackSharedConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackSharedConfigService],
    }).compile();

    service = module.get<WebpackSharedConfigService>(WebpackSharedConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
