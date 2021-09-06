import { Test } from '@nestjs/testing';
import { SolidAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';
describe('SolidAppWebpackCopyWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackCopyWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackCopyWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-copy-webpack-plugin.service.spec.js.map