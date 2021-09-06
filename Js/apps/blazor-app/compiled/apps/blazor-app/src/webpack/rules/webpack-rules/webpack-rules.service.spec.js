import { Test } from '@nestjs/testing';
import { BlazorAppWebpackRulesConfigService } from './webpack-rules.service';
describe('BlazorAppWebpackRulesConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackRulesConfigService],
        }).compile();
        service = module.get(BlazorAppWebpackRulesConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rules.service.spec.js.map