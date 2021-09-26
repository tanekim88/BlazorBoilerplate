import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppViteProdService } from './vite-prod.service';

describe('BlazorAppViteProdService', () => {
    let service: BlazorAppViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppViteProdService],
        }).compile();

        service = module.get<BlazorAppViteProdService>(BlazorAppViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
