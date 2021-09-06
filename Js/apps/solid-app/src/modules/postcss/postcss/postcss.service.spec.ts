import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppPostcssService } from './postcss.service';

describe('SolidAppPostcssService', () => {
    let service: SolidAppPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppPostcssService],
        }).compile();

        service = module.get<SolidAppPostcssService>(SolidAppPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
