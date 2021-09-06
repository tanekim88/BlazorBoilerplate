import { Test } from '@nestjs/testing';
import { WebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';
describe('WebpackWebpackChokidarPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWebpackChokidarPluginService],
        }).compile();
        service = module.get(WebpackWebpackChokidarPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=chokidar-plugin.service.spec.js.map