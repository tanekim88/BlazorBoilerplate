import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackWatchEntriesPluginConfigService } from './webpack-watch-entries-plugin.service';

describe('BlazorAppWebpackWatchEntriesPluginConfigService', () => {
    let service: BlazorAppWebpackWatchEntriesPluginConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackWatchEntriesPluginConfigService],
        }).compile();

        service = module.get<BlazorAppWebpackWatchEntriesPluginConfigService>(BlazorAppWebpackWatchEntriesPluginConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
