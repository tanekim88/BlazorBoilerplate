import { Test } from '@nestjs/testing';
import { AuthWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';
describe('AuthWebpackWebpackChokidarPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackWebpackChokidarPluginService],
        }).compile();
        service = module.get(AuthWebpackWebpackChokidarPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.spec.js.map