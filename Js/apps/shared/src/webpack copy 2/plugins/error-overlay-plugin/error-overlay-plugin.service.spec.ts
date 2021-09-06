import { Test, TestingModule } from '@nestjs/testing';
import { WebpackErrorOverlayWebpackPluginService } from './webpack-error-overlay-webpack-plugin.service';

describe('WebpackErrorOverlayWebpackPluginService', () => {
    let service: WebpackErrorOverlayWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackErrorOverlayWebpackPluginService],
        }).compile();

        service = module.get<WebpackErrorOverlayWebpackPluginService>(WebpackErrorOverlayWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
