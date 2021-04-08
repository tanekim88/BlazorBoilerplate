import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';

describe('AuthWebpackWorkboxWebpackPluginService', () => {
    let service: AuthWebpackWorkboxWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackWorkboxWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackWorkboxWebpackPluginService>(AuthWebpackWorkboxWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
