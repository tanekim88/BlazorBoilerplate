import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackImageRulesService } from './webpack-image-rules.service';

describe('AuthWebpackImageRulesService', () => {
    let service: AuthWebpackImageRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackImageRulesService],
        }).compile();

        service = module.get<AuthWebpackImageRulesService>(AuthWebpackImageRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
