import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';

describe('BlazorAppWebpackExtractSvgSpriteWebpackPluginService', () => {
    let service: BlazorAppWebpackExtractSvgSpriteWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackExtractSvgSpriteWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackExtractSvgSpriteWebpackPluginService>(
            BlazorAppWebpackExtractSvgSpriteWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
