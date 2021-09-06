import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';

describe('WebpackWebpackChokidarPluginService', () => {
    let service: WebpackWebpackChokidarPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackWebpackChokidarPluginService],
        }).compile();

        service = module.get<WebpackWebpackChokidarPluginService>(WebpackWebpackChokidarPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
