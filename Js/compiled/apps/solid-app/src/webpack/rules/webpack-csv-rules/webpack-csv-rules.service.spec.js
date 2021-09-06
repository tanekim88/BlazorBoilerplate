import { Test } from '@nestjs/testing';
import { SolidAppWebpackCsvRulesService } from './webpack-csv-rules.service';
describe('SolidAppWebpackCsvRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackCsvRulesService],
        }).compile();
        service = module.get(SolidAppWebpackCsvRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-csv-rules.service.spec.js.map