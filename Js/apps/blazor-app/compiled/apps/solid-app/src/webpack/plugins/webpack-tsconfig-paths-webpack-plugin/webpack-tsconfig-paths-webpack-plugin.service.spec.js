import { Test } from '@nestjs/testing';
import { SolidAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';
describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackTsconfigPathsWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackTsconfigPathsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.spec.js.map