import { Test } from '@nestjs/testing';
import { PostcssExtendRuleService } from './postcss-extend-rule.service';
describe('PostcssExtendRuleService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssExtendRuleService],
        }).compile();
        service = module.get(PostcssExtendRuleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-extend-rule.service.spec.js.map