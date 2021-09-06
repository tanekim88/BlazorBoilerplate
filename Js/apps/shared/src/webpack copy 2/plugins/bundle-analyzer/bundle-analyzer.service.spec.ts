import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWebpackBundleAnalyzerService } from './webpack-webpack-bundle-analyzer.service';

describe('WebpackWebpackBundleAnalyzerService', () => {
  let service: WebpackWebpackBundleAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackWebpackBundleAnalyzerService],
    }).compile();

    service = module.get<WebpackWebpackBundleAnalyzerService>(WebpackWebpackBundleAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
