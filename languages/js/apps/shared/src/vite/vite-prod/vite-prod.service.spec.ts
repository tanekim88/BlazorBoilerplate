import { Test, TestingModule } from '@nestjs/testing';
import { ViteProdService } from './vite-prod.service';

describe('ViteProdService', () => {
    let service: ViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ViteProdService],
        }).compile();

        service = module.get<ViteProdService>(ViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
