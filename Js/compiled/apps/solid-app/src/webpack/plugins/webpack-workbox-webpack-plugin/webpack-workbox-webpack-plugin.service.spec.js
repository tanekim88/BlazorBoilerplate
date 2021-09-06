import { Test } from '@nestjs/testing';
import { SolidAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';
describe('SolidAppWebpackWorkboxWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackWorkboxWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackWorkboxWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.spec.js.map