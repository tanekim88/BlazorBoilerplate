import { Test } from '@nestjs/testing';
import { SolidAppWebpackRulesConfigService } from './webpack-rules.service';
describe('SolidAppWebpackRulesConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackRulesConfigService],
        }).compile();
        service = module.get(SolidAppWebpackRulesConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rules.service.spec.js.map