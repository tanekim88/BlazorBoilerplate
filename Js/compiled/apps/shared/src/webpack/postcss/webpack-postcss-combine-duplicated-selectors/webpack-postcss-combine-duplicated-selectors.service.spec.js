import { Test } from '@nestjs/testing';
import { WebpackPostcssCombineDuplicatedSelectorsService } from './webpack-postcss-combine-duplicated-selectors.service';
describe('WebpackPostcssCombineDuplicatedSelectorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssCombineDuplicatedSelectorsService],
        }).compile();
        service = module.get(WebpackPostcssCombineDuplicatedSelectorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-combine-duplicated-selectors.service.spec.js.map