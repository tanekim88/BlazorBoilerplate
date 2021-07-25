import { Test } from '@nestjs/testing';
import { AuthWebpackJsonRulesService } from './webpack-json-rules.service';
describe('AuthWebpackJsonRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackJsonRulesService],
        }).compile();
        service = module.get(AuthWebpackJsonRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-json-rules.service.spec.js.map