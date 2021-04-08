import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackWatchEntriesPluginConfigService } from './webpack-watch-entries-plugin.service';

describe('AuthWebpackWatchEntriesPluginConfigService', () => {
    let service: AuthWebpackWatchEntriesPluginConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackWatchEntriesPluginConfigService],
        }).compile();

        service = module.get<AuthWebpackWatchEntriesPluginConfigService>(AuthWebpackWatchEntriesPluginConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
