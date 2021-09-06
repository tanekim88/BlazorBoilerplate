import { Test } from '@nestjs/testing';
import { PostcssCombineDuplicatedSelectorsService } from './postcss-combine-duplicated-selectors.service';
describe('PostcssCombineDuplicatedSelectorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssCombineDuplicatedSelectorsService],
        }).compile();
        service = module.get(PostcssCombineDuplicatedSelectorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-combine-duplicated-selectors.service.spec.js.map