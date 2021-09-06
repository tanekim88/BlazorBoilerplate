import { Test } from '@nestjs/testing';
import { AuthWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';
describe('AuthWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();
        service = module.get(AuthWebpackWebpackFixStyleOnlyEntriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.spec.js.map