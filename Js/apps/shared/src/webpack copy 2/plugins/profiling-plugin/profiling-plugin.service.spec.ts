import { Test, TestingModule } from '@nestjs/testing';
import { WebpackProfilingPluginService } from './webpack-profiling-plugin.service';

describe('WebpackProfilingPluginService', () => {
  let service: WebpackProfilingPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackProfilingPluginService],
    }).compile();

    service = module.get<WebpackProfilingPluginService>(WebpackProfilingPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
