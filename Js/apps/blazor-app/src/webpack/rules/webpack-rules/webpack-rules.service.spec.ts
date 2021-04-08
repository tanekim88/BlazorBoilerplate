import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackRulesConfigService } from './webpack-rules.service';

describe('BlazorAppWebpackRulesConfigService', () => {
    let service: BlazorAppWebpackRulesConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackRulesConfigService],
        }).compile();

        service = module.get<BlazorAppWebpackRulesConfigService>(BlazorAppWebpackRulesConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
