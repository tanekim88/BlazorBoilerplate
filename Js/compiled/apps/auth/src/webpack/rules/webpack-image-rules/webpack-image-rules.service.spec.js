import { Test } from '@nestjs/testing';
import { AuthWebpackImageRulesService } from './webpack-image-rules.service';
describe('AuthWebpackImageRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackImageRulesService],
        }).compile();
        service = module.get(AuthWebpackImageRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-image-rules.service.spec.js.map