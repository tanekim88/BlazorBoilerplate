import { Test } from '@nestjs/testing';
import { WebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';
describe('WebpackWebpackFixStyleOnlyEntriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWebpackFixStyleOnlyEntriesService],
        }).compile();
        service = module.get(WebpackWebpackFixStyleOnlyEntriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.spec.js.map