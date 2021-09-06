import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppViteProdService } from './vite-prod.service';

describe('SolidAppViteProdService', () => {
    let service: SolidAppViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppViteProdService],
        }).compile();

        service = module.get<SolidAppViteProdService>(SolidAppViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
