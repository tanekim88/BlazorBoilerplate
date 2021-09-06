import { Test } from '@nestjs/testing';
import { SolidAppMergeService } from './merge.service';
describe('SolidAppMergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppMergeService],
        }).compile();
        service = module.get(SolidAppMergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map