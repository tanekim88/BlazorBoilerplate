import { Test } from '@nestjs/testing';
import { BlazorAppWebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';
describe('BlazorAppWebpackSvgSpriteLoaderPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackSvgSpriteLoaderPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackSvgSpriteLoaderPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-sprite-loader-plugin.service.spec.js.map