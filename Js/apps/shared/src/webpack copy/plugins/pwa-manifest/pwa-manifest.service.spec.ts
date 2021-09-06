import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWebpackPwaManifestService } from './webpack-webpack-pwa-manifest.service';

describe('WebpackWebpackPwaManifestService', () => {
  let service: WebpackWebpackPwaManifestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackWebpackPwaManifestService],
    }).compile();

    service = module.get<WebpackWebpackPwaManifestService>(WebpackWebpackPwaManifestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
