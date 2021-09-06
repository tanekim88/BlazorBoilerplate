import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssExtendRuleService } from './webpack-postcss-extend-rule.service';

describe('WebpackPostcssExtendRuleService', () => {
    let service: WebpackPostcssExtendRuleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssExtendRuleService],
        }).compile();

        service = module.get<WebpackPostcssExtendRuleService>(WebpackPostcssExtendRuleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
