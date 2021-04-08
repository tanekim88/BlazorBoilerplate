import { Test, TestingModule } from '@nestjs/testing';
import { WebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';

describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service: WebpackTsconfigPathsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackTsconfigPathsWebpackPluginService],
        }).compile();

        service = module.get<WebpackTsconfigPathsWebpackPluginService>(WebpackTsconfigPathsWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
