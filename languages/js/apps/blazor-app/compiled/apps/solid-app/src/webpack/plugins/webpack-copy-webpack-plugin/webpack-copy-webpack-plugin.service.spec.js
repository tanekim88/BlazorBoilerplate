import { Test } from '@nestjs/testing';
import { BlazorAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';
describe('BlazorAppWebpackCopyWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackCopyWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackCopyWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-copy-webpack-plugin.service.spec.js.map