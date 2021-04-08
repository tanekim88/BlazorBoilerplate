import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackStyleRulesService } from './webpack-style-rules.service';

describe('BlazorAppWebpackStyleRulesService', () => {
    let service: BlazorAppWebpackStyleRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackStyleRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackStyleRulesService>(BlazorAppWebpackStyleRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
