import { Test } from '@nestjs/testing';
import { BlazorAppWebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';
describe('BlazorAppWebpackExtractSvgSpriteWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackExtractSvgSpriteWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackExtractSvgSpriteWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.spec.js.map