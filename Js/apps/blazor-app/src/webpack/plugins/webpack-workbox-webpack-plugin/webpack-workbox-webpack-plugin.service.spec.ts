import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';

describe('BlazorAppWebpackWorkboxWebpackPluginService', () => {
    let service: BlazorAppWebpackWorkboxWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackWorkboxWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackWorkboxWebpackPluginService>(BlazorAppWebpackWorkboxWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
