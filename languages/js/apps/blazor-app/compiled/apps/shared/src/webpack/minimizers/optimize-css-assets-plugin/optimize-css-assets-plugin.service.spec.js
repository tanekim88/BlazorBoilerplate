import { Test } from '@nestjs/testing';
import { WebpackOptimizeCssAssetsPluginService } from './webpack-optimize-css-assets-plugin.service';
describe('WebpackOptimizeCssAssetsPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackOptimizeCssAssetsPluginService],
        }).compile();
        service = module.get(WebpackOptimizeCssAssetsPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=optimize-css-assets-plugin.service.spec.js.map