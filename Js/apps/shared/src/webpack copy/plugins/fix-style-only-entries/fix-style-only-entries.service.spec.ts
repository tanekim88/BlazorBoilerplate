import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';

describe('WebpackWebpackFixStyleOnlyEntriesService', () => {
    let service: WebpackWebpackFixStyleOnlyEntriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackWebpackFixStyleOnlyEntriesService],
        }).compile();

        service = module.get<WebpackWebpackFixStyleOnlyEntriesService>(WebpackWebpackFixStyleOnlyEntriesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
