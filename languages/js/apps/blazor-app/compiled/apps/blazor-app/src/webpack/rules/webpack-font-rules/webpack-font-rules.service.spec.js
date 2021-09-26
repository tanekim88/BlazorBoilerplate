import { Test } from '@nestjs/testing';
import { BlazorAppWebpackFontRulesService } from './webpack-font-rules.service';
describe('BlazorAppWebpackFontRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackFontRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackFontRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-font-rules.service.spec.js.map