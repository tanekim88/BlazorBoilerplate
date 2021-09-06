import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';

describe('WebpackSvgSpriteLoaderPluginService', () => {
    let service: WebpackSvgSpriteLoaderPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackSvgSpriteLoaderPluginService],
        }).compile();

        service = module.get<WebpackSvgSpriteLoaderPluginService>(WebpackSvgSpriteLoaderPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
