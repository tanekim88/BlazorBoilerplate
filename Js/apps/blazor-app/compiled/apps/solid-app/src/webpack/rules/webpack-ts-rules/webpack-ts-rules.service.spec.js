import { Test } from '@nestjs/testing';
import { SolidAppWebpackTsRulesService } from './webpack-ts-rules.service';
describe('SolidAppWebpackTsRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackTsRulesService],
        }).compile();
        service = module.get(SolidAppWebpackTsRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-ts-rules.service.spec.js.map