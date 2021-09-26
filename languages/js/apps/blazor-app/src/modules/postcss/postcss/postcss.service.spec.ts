import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppPostcssService } from './postcss.service';

describe('BlazorAppPostcssService', () => {
    let service: BlazorAppPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppPostcssService],
        }).compile();

        service = module.get<BlazorAppPostcssService>(BlazorAppPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
