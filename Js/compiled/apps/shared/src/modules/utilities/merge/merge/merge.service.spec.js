import { Test } from '@nestjs/testing';
import { MergeService } from './merge.service';
describe('MergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [MergeService],
        }).compile();
        service = module.get(MergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map