import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackSvgRulesService } from './webpack-svg-rules.service';

describe('BlazorAppWebpackSvgRulesService', () => {
    let service: BlazorAppWebpackSvgRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackSvgRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackSvgRulesService>(BlazorAppWebpackSvgRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
