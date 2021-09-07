import { Test } from '@nestjs/testing';
import { BlazorAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';
describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackTsconfigPathsWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackTsconfigPathsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.spec.js.map