import { Test } from '@nestjs/testing';
import { SolidAppWebpackFontRulesService } from './webpack-font-rules.service';
describe('SolidAppWebpackFontRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackFontRulesService],
        }).compile();
        service = module.get(SolidAppWebpackFontRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-font-rules.service.spec.js.map