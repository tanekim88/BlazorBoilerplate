import { Test } from '@nestjs/testing';
import { WebpackPostcssAdvancedVariablesService } from './webpack-postcss-advanced-variables.service';
describe('WebpackPostcssAdvancedVariablesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssAdvancedVariablesService],
        }).compile();
        service = module.get(WebpackPostcssAdvancedVariablesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-advanced-variables.service.spec.js.map