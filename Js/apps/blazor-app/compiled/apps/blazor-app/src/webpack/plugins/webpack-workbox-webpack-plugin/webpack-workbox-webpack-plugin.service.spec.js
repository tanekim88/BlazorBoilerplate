import { Test } from '@nestjs/testing';
import { BlazorAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';
describe('BlazorAppWebpackWorkboxWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackWorkboxWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackWorkboxWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.spec.js.map