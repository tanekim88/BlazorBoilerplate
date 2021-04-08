import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackSvgRulesService } from './webpack-svg-rules.service';

describe('AuthWebpackSvgRulesService', () => {
    let service: AuthWebpackSvgRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackSvgRulesService],
        }).compile();

        service = module.get<AuthWebpackSvgRulesService>(AuthWebpackSvgRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
