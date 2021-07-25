import { Test } from '@nestjs/testing';
import { WebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';
describe('WebpackWorkboxWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWorkboxWebpackPluginService],
        }).compile();
        service = module.get(WebpackWorkboxWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.spec.js.map