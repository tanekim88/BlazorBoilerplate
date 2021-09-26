import { Test } from '@nestjs/testing';
import { WebpackPostcssService } from './webpack-postcss.service';
describe('WebpackPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssService],
        }).compile();
        service = module.get(WebpackPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map