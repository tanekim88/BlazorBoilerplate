import { Test } from '@nestjs/testing';
import { BlazorAppWebpackJsonRulesService } from './webpack-json-rules.service';
describe('BlazorAppWebpackJsonRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackJsonRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackJsonRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-json-rules.service.spec.js.map