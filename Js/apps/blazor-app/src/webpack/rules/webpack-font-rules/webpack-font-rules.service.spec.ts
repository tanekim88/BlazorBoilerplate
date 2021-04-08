import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackFontRulesService } from './webpack-font-rules.service';

describe('BlazorAppWebpackFontRulesService', () => {
    let service: BlazorAppWebpackFontRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackFontRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackFontRulesService>(BlazorAppWebpackFontRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
