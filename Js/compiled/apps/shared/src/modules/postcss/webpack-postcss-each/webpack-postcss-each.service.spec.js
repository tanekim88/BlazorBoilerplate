import { Test } from '@nestjs/testing';
import { WebpackPostcssEachService } from './webpack-postcss-each.service';
describe('WebpackPostcssEachService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssEachService],
        }).compile();
        service = module.get(WebpackPostcssEachService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-each.service.spec.js.map