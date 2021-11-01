import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppViteProdService } from './vite-prod.service';

describe('ReactAppViteProdService', () => {
    let service: ReactAppViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppViteProdService],
        }).compile();

        service = module.get<ReactAppViteProdService>(ReactAppViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
