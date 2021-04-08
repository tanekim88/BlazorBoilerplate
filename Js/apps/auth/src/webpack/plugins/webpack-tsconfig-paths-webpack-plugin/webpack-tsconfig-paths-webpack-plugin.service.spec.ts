import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';

describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service: AuthWebpackTsconfigPathsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackTsconfigPathsWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackTsconfigPathsWebpackPluginService>(
            AuthWebpackTsconfigPathsWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
