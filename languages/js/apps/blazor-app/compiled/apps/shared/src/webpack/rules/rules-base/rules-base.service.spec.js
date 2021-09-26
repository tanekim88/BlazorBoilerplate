import { Test } from '@nestjs/testing';
import { WebpackRulesBaseService } from './webpack-rules-base.service';
describe('WebpackRulesBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackRulesBaseService],
        }).compile();
        service = module.get(WebpackRulesBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=rules-base.service.spec.js.map