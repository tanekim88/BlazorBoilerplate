import { Test, TestingModule } from '@nestjs/testing';
import { WebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';

describe('WebpackExtractSvgSpriteWebpackPluginService', () => {
    let service: WebpackExtractSvgSpriteWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackExtractSvgSpriteWebpackPluginService],
        }).compile();

        service = module.get<WebpackExtractSvgSpriteWebpackPluginService>(WebpackExtractSvgSpriteWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
