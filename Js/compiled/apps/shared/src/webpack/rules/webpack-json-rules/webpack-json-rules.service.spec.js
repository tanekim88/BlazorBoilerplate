import { Test } from '@nestjs/testing';
import { WebpackJsonRulesService } from './webpack-json-rules.service';
describe('WebpackJsonRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackJsonRulesService],
        }).compile();
        service = module.get(WebpackJsonRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-json-rules.service.spec.js.map