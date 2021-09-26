import { Test } from '@nestjs/testing';
import { WebpackCsvRulesService } from './webpack-csv-rules.service';
describe('WebpackCsvRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackCsvRulesService],
        }).compile();
        service = module.get(WebpackCsvRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=csv-rules.service.spec.js.map