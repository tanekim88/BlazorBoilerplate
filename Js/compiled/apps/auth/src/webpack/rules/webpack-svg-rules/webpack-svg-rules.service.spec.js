import { Test } from '@nestjs/testing';
import { AuthWebpackSvgRulesService } from './webpack-svg-rules.service';
describe('AuthWebpackSvgRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackSvgRulesService],
        }).compile();
        service = module.get(AuthWebpackSvgRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-rules.service.spec.js.map