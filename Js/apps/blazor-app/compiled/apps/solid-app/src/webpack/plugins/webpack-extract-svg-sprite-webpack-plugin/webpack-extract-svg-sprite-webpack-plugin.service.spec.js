import { Test } from '@nestjs/testing';
import { SolidAppWebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';
describe('SolidAppWebpackExtractSvgSpriteWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackExtractSvgSpriteWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackExtractSvgSpriteWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.spec.js.map