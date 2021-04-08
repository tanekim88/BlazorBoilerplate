import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackImageRulesService } from './webpack-image-rules.service';

describe('BlazorAppWebpackImageRulesService', () => {
    let service: BlazorAppWebpackImageRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackImageRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackImageRulesService>(BlazorAppWebpackImageRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
