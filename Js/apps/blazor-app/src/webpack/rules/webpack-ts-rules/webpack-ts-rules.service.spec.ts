import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackTsRulesService } from './webpack-ts-rules.service';

describe('BlazorAppWebpackTsRulesService', () => {
    let service: BlazorAppWebpackTsRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackTsRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackTsRulesService>(BlazorAppWebpackTsRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
