import { Test } from '@nestjs/testing';
import { WebpackFontRulesService } from './webpack-font-rules.service';
describe('WebpackFontRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackFontRulesService],
        }).compile();
        service = module.get(WebpackFontRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=font-rules.service.spec.js.map