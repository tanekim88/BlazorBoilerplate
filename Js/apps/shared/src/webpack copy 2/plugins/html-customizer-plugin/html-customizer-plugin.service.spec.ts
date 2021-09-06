import { Test, TestingModule } from '@nestjs/testing';
import { WebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin.service';

describe('WebpackHtmlWebpackCustomizerPluginService', () => {
  let service: WebpackHtmlWebpackCustomizerPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpackHtmlWebpackCustomizerPluginService],
    }).compile();

    service = module.get<WebpackHtmlWebpackCustomizerPluginService>(WebpackHtmlWebpackCustomizerPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
