import { Test, TestingModule } from '@nestjs/testing';
import { VitePluginHtmlService } from './vite-plugin-html.service';

describe('VitePluginHtmlService', () => {
  let service: VitePluginHtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitePluginHtmlService],
    }).compile();

    service = module.get<VitePluginHtmlService>(VitePluginHtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
