import { Test } from '@nestjs/testing';
import { BlazorAppWebpackPluginsConfigService } from './webpack-plugins.service';
describe('BlazorAppWebpackPluginsConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackPluginsConfigService],
        }).compile();
        service = module.get(BlazorAppWebpackPluginsConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugins.service.spec.js.map