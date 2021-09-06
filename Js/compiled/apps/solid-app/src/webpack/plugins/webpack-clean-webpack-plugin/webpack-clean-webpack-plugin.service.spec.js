import { Test } from '@nestjs/testing';
import { SolidAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';
describe('SolidAppWebpackCleanWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackCleanWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackCleanWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-clean-webpack-plugin.service.spec.js.map