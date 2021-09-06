import { Test } from '@nestjs/testing';
import { WebpackPostcssExtendRuleService } from './webpack-postcss-extend-rule.service';
describe('WebpackPostcssExtendRuleService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssExtendRuleService],
        }).compile();
        service = module.get(WebpackPostcssExtendRuleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-extend-rule.service.spec.js.map