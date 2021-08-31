import { Test } from '@nestjs/testing';
import { WebpackPostcssSimpleVarsService } from './webpack-postcss-simple-vars.service';
describe('WebpackPostcssSimpleVarsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssSimpleVarsService],
        }).compile();
        service = module.get(WebpackPostcssSimpleVarsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-simple-vars.service.spec.js.map