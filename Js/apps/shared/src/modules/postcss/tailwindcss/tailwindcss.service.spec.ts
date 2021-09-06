import { Test, TestingModule } from '@nestjs/testing';
import { TailwindcssService } from './tailwindcss.service';

describe('TailwindcssService', () => {
    let service: TailwindcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TailwindcssService],
        }).compile();

        service = module.get<TailwindcssService>(TailwindcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
