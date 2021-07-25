import { Test } from '@nestjs/testing';
import { BlazorAppMergeService } from './merge.service';
describe('BlazorAppMergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppMergeService],
        }).compile();
        service = module.get(BlazorAppMergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map