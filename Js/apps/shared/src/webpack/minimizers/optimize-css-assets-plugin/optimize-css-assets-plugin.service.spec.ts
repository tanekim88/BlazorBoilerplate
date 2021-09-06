import { Test, TestingModule } from '@nestjs/testing';
import { WebpackOptimizeCssAssetsPluginService } from './webpack-optimize-css-assets-plugin.service';

describe('WebpackOptimizeCssAssetsPluginService', () => {
    let service: WebpackOptimizeCssAssetsPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackOptimizeCssAssetsPluginService],
        }).compile();

        service = module.get<WebpackOptimizeCssAssetsPluginService>(WebpackOptimizeCssAssetsPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
