import { Test } from '@nestjs/testing';
import { SolidAppWebpackSvgRulesService } from './webpack-svg-rules.service';
describe('SolidAppWebpackSvgRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackSvgRulesService],
        }).compile();
        service = module.get(SolidAppWebpackSvgRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-rules.service.spec.js.map