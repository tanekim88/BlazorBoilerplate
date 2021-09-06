import { Test } from '@nestjs/testing';
import { AuthWebpackFontRulesService } from './webpack-font-rules.service';
describe('AuthWebpackFontRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackFontRulesService],
        }).compile();
        service = module.get(AuthWebpackFontRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-font-rules.service.spec.js.map