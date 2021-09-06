import { Test } from '@nestjs/testing';
import { SolidAppWebpackPluginsConfigService } from './webpack-plugins.service';
describe('SolidAppWebpackPluginsConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackPluginsConfigService],
        }).compile();
        service = module.get(SolidAppWebpackPluginsConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugins.service.spec.js.map