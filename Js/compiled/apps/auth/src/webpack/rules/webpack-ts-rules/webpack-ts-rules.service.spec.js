import { Test } from '@nestjs/testing';
import { AuthWebpackTsRulesService } from './webpack-ts-rules.service';
describe('AuthWebpackTsRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackTsRulesService],
        }).compile();
        service = module.get(AuthWebpackTsRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-ts-rules.service.spec.js.map