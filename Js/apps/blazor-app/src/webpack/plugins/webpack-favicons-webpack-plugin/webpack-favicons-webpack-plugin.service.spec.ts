import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';

describe('BlazorAppWebpackFaviconsWebpackPluginService', () => {
    let service: BlazorAppWebpackFaviconsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackFaviconsWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackFaviconsWebpackPluginService>(
            BlazorAppWebpackFaviconsWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
