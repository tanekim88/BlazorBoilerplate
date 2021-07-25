import { Test } from '@nestjs/testing';
import { WebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';
describe('WebpackCopyWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackCopyWebpackPluginService],
        }).compile();
        service = module.get(WebpackCopyWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-copy-webpack-plugin.service.spec.js.map