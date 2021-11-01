import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppPostcssService } from './postcss.service';

describe('ReactAppPostcssService', () => {
    let service: ReactAppPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppPostcssService],
        }).compile();

        service = module.get<ReactAppPostcssService>(ReactAppPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
