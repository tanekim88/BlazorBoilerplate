import { Test } from '@nestjs/testing';
import { SolidAppWebpackStyleRulesService } from './webpack-style-rules.service';
describe('SolidAppWebpackStyleRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackStyleRulesService],
        }).compile();
        service = module.get(SolidAppWebpackStyleRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-style-rules.service.spec.js.map