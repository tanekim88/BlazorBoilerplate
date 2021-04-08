import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackRulesConfigService } from './webpack-rules.service';

describe('AuthWebpackRulesConfigService', () => {
    let service: AuthWebpackRulesConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackRulesConfigService],
        }).compile();

        service = module.get<AuthWebpackRulesConfigService>(AuthWebpackRulesConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
