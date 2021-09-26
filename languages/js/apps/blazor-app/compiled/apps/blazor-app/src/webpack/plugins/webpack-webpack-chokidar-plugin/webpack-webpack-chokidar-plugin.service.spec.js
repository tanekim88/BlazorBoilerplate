import { Test } from '@nestjs/testing';
import { BlazorAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin.service';
describe('BlazorAppWebpackWebpackChokidarPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackWebpackChokidarPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackWebpackChokidarPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.spec.js.map