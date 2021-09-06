import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSvgSpriteMapWebpackPluginService } from './webpack-svg-spritemap-webpack-plugin.service';

describe('WebpackSvgSpriteMapWebpackPluginService', () => {
    let service: WebpackSvgSpriteMapWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackSvgSpriteMapWebpackPluginService],
        }).compile();

        service = module.get<WebpackSvgSpriteMapWebpackPluginService>(WebpackSvgSpriteMapWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
