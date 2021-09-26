import { Test } from '@nestjs/testing';
import { WebpackTsRulesService } from './webpack-ts-rules.service';
describe('WebpackTsRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackTsRulesService],
        }).compile();
        service = module.get(WebpackTsRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=ts-rules.service.spec.js.map