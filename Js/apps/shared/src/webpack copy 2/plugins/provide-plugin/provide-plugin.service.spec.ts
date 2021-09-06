import { Test, TestingModule } from '@nestjs/testing';
import { WebpackProvidePluginService } from './webpack-provide-plugin.service';

describe('WebpackProvidePluginService', () => {
  let service: WebpackProvidePluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackProvidePluginService],
    }).compile();

    service = module.get<WebpackProvidePluginService>(WebpackProvidePluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
