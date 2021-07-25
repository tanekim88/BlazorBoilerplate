import { Test } from '@nestjs/testing';
import { WebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';
describe('WebpackExtractSvgSpriteWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackExtractSvgSpriteWebpackPluginService],
        }).compile();
        service = module.get(WebpackExtractSvgSpriteWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.spec.js.map