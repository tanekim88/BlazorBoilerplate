import { Test } from '@nestjs/testing';
import { WebpackPostcssBaseService } from './webpack-postcss-base.service';
describe('WebpackPostcssBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssBaseService],
        }).compile();
        service = module.get(WebpackPostcssBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-base.service.spec.js.map