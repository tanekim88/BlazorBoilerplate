import { Test } from '@nestjs/testing';
import { WebpackRulesService } from './webpack-rules.service';
describe('WebpackRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackRulesService],
        }).compile();
        service = module.get(WebpackRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rules.service.spec.js.map