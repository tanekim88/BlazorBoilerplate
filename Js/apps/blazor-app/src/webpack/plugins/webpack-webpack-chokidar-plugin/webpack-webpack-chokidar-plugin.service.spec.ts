import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';

describe('BlazorAppWebpackWebpackChokidarPluginService', () => {
    let service: BlazorAppWebpackWebpackChokidarPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackWebpackChokidarPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackWebpackChokidarPluginService>(
            BlazorAppWebpackWebpackChokidarPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
