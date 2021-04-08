import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackFontRulesService } from './webpack-font-rules.service';

describe('AuthWebpackFontRulesService', () => {
    let service: AuthWebpackFontRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackFontRulesService],
        }).compile();

        service = module.get<AuthWebpackFontRulesService>(AuthWebpackFontRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
