import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackStyleRulesService } from './webpack-style-rules.service';

describe('AuthWebpackStyleRulesService', () => {
    let service: AuthWebpackStyleRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackStyleRulesService],
        }).compile();

        service = module.get<AuthWebpackStyleRulesService>(AuthWebpackStyleRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
