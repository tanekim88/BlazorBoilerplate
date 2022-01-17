import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppRegexService } from './regex.service';

describe('AngularAppRegexService', () => {
    let service: AngularAppRegexService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppRegexService],
        }).compile();

        service = module.get<AngularAppRegexService>(AngularAppRegexService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
