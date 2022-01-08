import { Test } from '@nestjs/testing';
import { ReactAppMergeService } from './merge.service';
describe('ReactAppMergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppMergeService],
        }).compile();
        service = module.get(ReactAppMergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map