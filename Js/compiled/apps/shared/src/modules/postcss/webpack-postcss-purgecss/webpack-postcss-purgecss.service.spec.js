import { Test } from '@nestjs/testing';
import { WebpackPostcssPurgecssService } from './webpack-postcss-purgecss.service';
describe('WebpackPostcssPurgecssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssPurgecssService],
        }).compile();
        service = module.get(WebpackPostcssPurgecssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-purgecss.service.spec.js.map