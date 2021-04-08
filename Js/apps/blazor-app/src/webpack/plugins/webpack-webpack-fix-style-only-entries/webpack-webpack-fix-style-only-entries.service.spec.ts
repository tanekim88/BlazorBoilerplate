import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';

describe('BlazorAppWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service: BlazorAppWebpackWebpackFixStyleOnlyEntriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();

        service = module.get<BlazorAppWebpackWebpackFixStyleOnlyEntriesService>(
            BlazorAppWebpackWebpackFixStyleOnlyEntriesService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
