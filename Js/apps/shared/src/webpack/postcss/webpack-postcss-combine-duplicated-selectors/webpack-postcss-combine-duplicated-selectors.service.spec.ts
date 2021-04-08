import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssCombineDuplicatedSelectorsService } from './webpack-postcss-combine-duplicated-selectors.service';

describe('WebpackPostcssCombineDuplicatedSelectorsService', () => {
    let service: WebpackPostcssCombineDuplicatedSelectorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssCombineDuplicatedSelectorsService],
        }).compile();

        service = module.get<WebpackPostcssCombineDuplicatedSelectorsService>(
            WebpackPostcssCombineDuplicatedSelectorsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
