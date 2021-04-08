import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';

describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service: BlazorAppWebpackTsconfigPathsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackTsconfigPathsWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackTsconfigPathsWebpackPluginService>(
            BlazorAppWebpackTsconfigPathsWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
