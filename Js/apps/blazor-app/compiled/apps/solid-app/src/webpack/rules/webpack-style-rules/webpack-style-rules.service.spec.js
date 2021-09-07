import { Test } from '@nestjs/testing';
import { BlazorAppWebpackStyleRulesService } from './webpack-style-rules.service';
describe('BlazorAppWebpackStyleRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackStyleRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackStyleRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-style-rules.service.spec.js.map