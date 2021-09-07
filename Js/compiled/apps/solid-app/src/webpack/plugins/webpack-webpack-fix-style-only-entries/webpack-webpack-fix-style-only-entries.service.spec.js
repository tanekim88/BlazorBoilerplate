import { Test } from '@nestjs/testing';
import { BlazorAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';
describe('BlazorAppWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();
        service = module.get(BlazorAppWebpackWebpackFixStyleOnlyEntriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.spec.js.map