import { Test } from '@nestjs/testing';
import { WebpackPostcssForService } from './webpack-postcss-for.service';
describe('WebpackPostcssForService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssForService],
        }).compile();
        service = module.get(WebpackPostcssForService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-for.service.spec.js.map