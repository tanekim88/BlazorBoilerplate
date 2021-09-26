import { Test } from '@nestjs/testing';
import { AuthWebpackRulesConfigService } from './webpack-rules.service';
describe('AuthWebpackRulesConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackRulesConfigService],
        }).compile();
        service = module.get(AuthWebpackRulesConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rules.service.spec.js.map