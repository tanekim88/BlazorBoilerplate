import { Test, TestingModule } from '@nestjs/testing';
import { AuthRegexService } from './regex.service';

describe('AuthRegexService', () => {
    let service: AuthRegexService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthRegexService],
        }).compile();

        service = module.get<AuthRegexService>(AuthRegexService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
