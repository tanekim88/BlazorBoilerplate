import { Test } from '@nestjs/testing';
import { AuthWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';
describe('AuthWebpackWorkboxWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackWorkboxWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackWorkboxWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.spec.js.map