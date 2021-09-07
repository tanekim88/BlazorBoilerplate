import { Test } from '@nestjs/testing';
import { BlazorAppWebpackCsvRulesService } from './webpack-csv-rules.service';
describe('BlazorAppWebpackCsvRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackCsvRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackCsvRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-csv-rules.service.spec.js.map