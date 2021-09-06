import { Test } from '@nestjs/testing';
import { SolidAppWebpackJsonRulesService } from './webpack-json-rules.service';
describe('SolidAppWebpackJsonRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackJsonRulesService],
        }).compile();
        service = module.get(SolidAppWebpackJsonRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-json-rules.service.spec.js.map