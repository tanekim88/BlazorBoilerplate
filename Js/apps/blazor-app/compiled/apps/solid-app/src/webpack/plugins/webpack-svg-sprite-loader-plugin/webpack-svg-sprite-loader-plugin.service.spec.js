import { Test } from '@nestjs/testing';
import { SolidAppWebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';
describe('SolidAppWebpackSvgSpriteLoaderPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackSvgSpriteLoaderPluginService],
        }).compile();
        service = module.get(SolidAppWebpackSvgSpriteLoaderPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-sprite-loader-plugin.service.spec.js.map