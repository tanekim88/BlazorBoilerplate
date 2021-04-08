import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';

describe('BlazorAppWebpackSvgSpriteLoaderPluginService', () => {
    let service: BlazorAppWebpackSvgSpriteLoaderPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackSvgSpriteLoaderPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackSvgSpriteLoaderPluginService>(
            BlazorAppWebpackSvgSpriteLoaderPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
