import { Test, TestingModule } from '@nestjs/testing';
import { PostcssExtendRuleService } from './postcss-extend-rule.service';

describe('PostcssExtendRuleService', () => {
    let service: PostcssExtendRuleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssExtendRuleService],
        }).compile();

        service = module.get<PostcssExtendRuleService>(PostcssExtendRuleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
