import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackCsvRulesService } from './webpack-csv-rules.service';

describe('BlazorAppWebpackCsvRulesService', () => {
    let service: BlazorAppWebpackCsvRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackCsvRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackCsvRulesService>(BlazorAppWebpackCsvRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
