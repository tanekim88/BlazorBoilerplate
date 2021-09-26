import { Test } from '@nestjs/testing';
import { BlazorAppWebpackWatchEntriesPluginConfigService } from './webpack-watch-entries-plugin.service';
describe('BlazorAppWebpackWatchEntriesPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackWatchEntriesPluginConfigService],
        }).compile();
        service = module.get(BlazorAppWebpackWatchEntriesPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-watch-entries-plugin.service.spec.js.map