import { Test } from '@nestjs/testing';
import { AuthWebpackStyleRulesService } from './webpack-style-rules.service';
describe('AuthWebpackStyleRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackStyleRulesService],
        }).compile();
        service = module.get(AuthWebpackStyleRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-style-rules.service.spec.js.map