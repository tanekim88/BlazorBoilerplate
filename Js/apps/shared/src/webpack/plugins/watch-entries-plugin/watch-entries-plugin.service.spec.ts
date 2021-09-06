import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWatchEntriesPluginService } from './webpack-watch-entries-plugin.service';

describe('WebpackWatchEntriesPluginService', () => {
    let service: WebpackWatchEntriesPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackWatchEntriesPluginService],
        }).compile();

        service = module.get<WebpackWatchEntriesPluginService>(WebpackWatchEntriesPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
