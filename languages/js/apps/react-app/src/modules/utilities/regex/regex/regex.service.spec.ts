import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppRegexService } from './regex.service';

describe('ReactAppRegexService', () => {
    let service: ReactAppRegexService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppRegexService],
        }).compile();

        service = module.get<ReactAppRegexService>(ReactAppRegexService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
