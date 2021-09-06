import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppRegexService } from './regex.service';

describe('SolidAppRegexService', () => {
    let service: SolidAppRegexService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppRegexService],
        }).compile();

        service = module.get<SolidAppRegexService>(SolidAppRegexService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
