import { Test } from '@nestjs/testing';
import { SolidAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';
describe('SolidAppWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();
        service = module.get(SolidAppWebpackWebpackFixStyleOnlyEntriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.spec.js.map