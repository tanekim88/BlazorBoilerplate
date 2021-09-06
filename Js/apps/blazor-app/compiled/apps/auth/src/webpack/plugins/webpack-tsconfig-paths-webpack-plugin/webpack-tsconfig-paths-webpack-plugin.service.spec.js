import { Test } from '@nestjs/testing';
import { AuthWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin.service';
describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackTsconfigPathsWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackTsconfigPathsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.spec.js.map