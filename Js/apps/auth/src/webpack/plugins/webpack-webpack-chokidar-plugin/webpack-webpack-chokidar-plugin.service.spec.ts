import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';

describe('AuthWebpackWebpackChokidarPluginService', () => {
    let service: AuthWebpackWebpackChokidarPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackWebpackChokidarPluginService],
        }).compile();

        service = module.get<AuthWebpackWebpackChokidarPluginService>(
            AuthWebpackWebpackChokidarPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
