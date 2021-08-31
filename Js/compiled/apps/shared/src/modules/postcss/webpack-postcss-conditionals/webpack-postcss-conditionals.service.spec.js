import { Test } from '@nestjs/testing';
import { WebpackPostcssConditionalsService } from './webpack-postcss-conditionals.service';
describe('WebpackPostcssConditionalsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssConditionalsService],
        }).compile();
        service = module.get(WebpackPostcssConditionalsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-conditionals.service.spec.js.map