import { Test, TestingModule } from '@nestjs/testing';
import { WebpackCsvRulesService } from './webpack-csv-rules.service';

describe('WebpackCsvRulesService', () => {
    let service: WebpackCsvRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackCsvRulesService],
        }).compile();

        service = module.get<WebpackCsvRulesService>(WebpackCsvRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
