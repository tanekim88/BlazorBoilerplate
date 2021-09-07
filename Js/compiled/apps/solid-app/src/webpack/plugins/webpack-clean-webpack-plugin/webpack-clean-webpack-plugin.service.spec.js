import { Test } from '@nestjs/testing';
import { BlazorAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';
describe('BlazorAppWebpackCleanWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackCleanWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackCleanWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-clean-webpack-plugin.service.spec.js.map