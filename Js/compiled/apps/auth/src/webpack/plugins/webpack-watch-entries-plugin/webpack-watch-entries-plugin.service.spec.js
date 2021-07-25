import { Test } from '@nestjs/testing';
import { AuthWebpackWatchEntriesPluginConfigService } from './webpack-watch-entries-plugin.service';
describe('AuthWebpackWatchEntriesPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackWatchEntriesPluginConfigService],
        }).compile();
        service = module.get(AuthWebpackWatchEntriesPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-watch-entries-plugin.service.spec.js.map