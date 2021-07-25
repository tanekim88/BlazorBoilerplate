import { Test } from '@nestjs/testing';
import { WebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';
describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackTsconfigPathsWebpackPluginService],
        }).compile();
        service = module.get(WebpackTsconfigPathsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.spec.js.map