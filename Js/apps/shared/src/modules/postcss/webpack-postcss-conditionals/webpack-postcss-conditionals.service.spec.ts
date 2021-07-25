import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssConditionalsService } from './webpack-postcss-conditionals.service';

describe('WebpackPostcssConditionalsService', () => {
    let service: WebpackPostcssConditionalsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssConditionalsService],
        }).compile();

        service = module.get<WebpackPostcssConditionalsService>(WebpackPostcssConditionalsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
