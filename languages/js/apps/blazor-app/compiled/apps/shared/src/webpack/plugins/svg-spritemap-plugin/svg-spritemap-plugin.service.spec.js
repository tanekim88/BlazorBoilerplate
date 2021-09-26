import { Test } from '@nestjs/testing';
import { WebpackSvgSpriteMapWebpackPluginService } from './webpack-svg-spritemap-webpack-plugin.service';
describe('WebpackSvgSpriteMapWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSvgSpriteMapWebpackPluginService],
        }).compile();
        service = module.get(WebpackSvgSpriteMapWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=svg-spritemap-plugin.service.spec.js.map