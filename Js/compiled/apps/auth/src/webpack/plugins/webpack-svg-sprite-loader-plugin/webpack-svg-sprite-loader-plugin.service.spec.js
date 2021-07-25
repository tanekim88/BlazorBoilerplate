import { Test } from '@nestjs/testing';
import { AuthWebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';
describe('AuthWebpackSvgSpriteLoaderPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackSvgSpriteLoaderPluginService],
        }).compile();
        service = module.get(AuthWebpackSvgSpriteLoaderPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-sprite-loader-plugin.service.spec.js.map