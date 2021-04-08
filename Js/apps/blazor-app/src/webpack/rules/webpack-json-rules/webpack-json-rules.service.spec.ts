import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackJsonRulesService } from './webpack-json-rules.service';

describe('BlazorAppWebpackJsonRulesService', () => {
    let service: BlazorAppWebpackJsonRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackJsonRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackJsonRulesService>(BlazorAppWebpackJsonRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
