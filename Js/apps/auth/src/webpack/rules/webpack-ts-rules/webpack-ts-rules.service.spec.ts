import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackTsRulesService } from './webpack-ts-rules.service';

describe('AuthWebpackTsRulesService', () => {
    let service: AuthWebpackTsRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackTsRulesService],
        }).compile();

        service = module.get<AuthWebpackTsRulesService>(AuthWebpackTsRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
