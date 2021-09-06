import { Test } from '@nestjs/testing';
import { AuthWebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';
describe('AuthWebpackExtractSvgSpriteWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackExtractSvgSpriteWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackExtractSvgSpriteWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.spec.js.map