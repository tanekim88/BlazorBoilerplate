import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackJsonRulesService } from './webpack-json-rules.service';

describe('AuthWebpackJsonRulesService', () => {
    let service: AuthWebpackJsonRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackJsonRulesService],
        }).compile();

        service = module.get<AuthWebpackJsonRulesService>(AuthWebpackJsonRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
