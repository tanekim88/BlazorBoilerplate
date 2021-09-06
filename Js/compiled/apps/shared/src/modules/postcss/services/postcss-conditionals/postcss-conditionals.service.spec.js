import { Test } from '@nestjs/testing';
import { PostcssConditionalsService } from './postcss-conditionals.service';
describe('PostcssConditionalsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssConditionalsService],
        }).compile();
        service = module.get(PostcssConditionalsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-conditionals.service.spec.js.map