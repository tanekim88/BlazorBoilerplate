import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackCsvRulesService } from './webpack-csv-rules.service';

describe('AuthWebpackCsvRulesService', () => {
    let service: AuthWebpackCsvRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackCsvRulesService],
        }).compile();

        service = module.get<AuthWebpackCsvRulesService>(AuthWebpackCsvRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
