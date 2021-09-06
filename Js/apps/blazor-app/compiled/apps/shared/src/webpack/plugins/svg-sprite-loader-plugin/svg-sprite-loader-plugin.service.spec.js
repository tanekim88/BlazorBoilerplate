import { Test } from '@nestjs/testing';
import { WebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';
describe('WebpackSvgSpriteLoaderPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSvgSpriteLoaderPluginService],
        }).compile();
        service = module.get(WebpackSvgSpriteLoaderPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=svg-sprite-loader-plugin.service.spec.js.map