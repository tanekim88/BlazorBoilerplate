import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppRegexService } from './regex.service';

describe('BlazorAppRegexService', () => {
    let service: BlazorAppRegexService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppRegexService],
        }).compile();

        service = module.get<BlazorAppRegexService>(BlazorAppRegexService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
