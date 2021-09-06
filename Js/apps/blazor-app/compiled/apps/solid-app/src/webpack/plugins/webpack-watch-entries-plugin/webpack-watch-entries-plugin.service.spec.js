import { Test } from '@nestjs/testing';
import { SolidAppWebpackWatchEntriesPluginConfigService } from './webpack-watch-entries-plugin.service';
describe('SolidAppWebpackWatchEntriesPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackWatchEntriesPluginConfigService],
        }).compile();
        service = module.get(SolidAppWebpackWatchEntriesPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-watch-entries-plugin.service.spec.js.map