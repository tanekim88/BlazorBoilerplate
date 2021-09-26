import { Test } from '@nestjs/testing';
import { AuthMergeService } from './merge.service';
describe('AuthMergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthMergeService],
        }).compile();
        service = module.get(AuthMergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map