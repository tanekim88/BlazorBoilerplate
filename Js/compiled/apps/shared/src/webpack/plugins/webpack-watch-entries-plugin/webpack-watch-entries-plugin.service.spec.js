import { Test } from '@nestjs/testing';
import { WebpackWatchEntriesPluginService } from './webpack-watch-entries-plugin.service';
describe('WebpackWatchEntriesPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWatchEntriesPluginService],
        }).compile();
        service = module.get(WebpackWatchEntriesPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-watch-entries-plugin.service.spec.js.map