import { Test } from '@nestjs/testing';
import { AuthWebpackCsvRulesService } from './webpack-csv-rules.service';
describe('AuthWebpackCsvRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackCsvRulesService],
        }).compile();
        service = module.get(AuthWebpackCsvRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-csv-rules.service.spec.js.map