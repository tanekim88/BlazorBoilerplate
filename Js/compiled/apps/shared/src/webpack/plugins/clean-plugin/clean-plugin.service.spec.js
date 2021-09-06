import { Test } from '@nestjs/testing';
import { WebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';
describe('WebpackCleanWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackCleanWebpackPluginService],
        }).compile();
        service = module.get(WebpackCleanWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=clean-plugin.service.spec.js.map