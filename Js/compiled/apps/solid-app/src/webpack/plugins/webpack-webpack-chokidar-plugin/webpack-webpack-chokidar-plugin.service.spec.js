import { Test } from '@nestjs/testing';
import { SolidAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';
describe('SolidAppWebpackWebpackChokidarPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackWebpackChokidarPluginService],
        }).compile();
        service = module.get(SolidAppWebpackWebpackChokidarPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.spec.js.map