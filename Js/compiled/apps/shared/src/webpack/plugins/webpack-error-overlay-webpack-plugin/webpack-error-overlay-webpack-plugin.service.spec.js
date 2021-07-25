import { Test } from '@nestjs/testing';
import { WebpackErrorOverlayWebpackPluginService } from './webpack-error-overlay-webpack-plugin.service';
describe('WebpackErrorOverlayWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackErrorOverlayWebpackPluginService],
        }).compile();
        service = module.get(WebpackErrorOverlayWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-error-overlay-webpack-plugin.service.spec.js.map