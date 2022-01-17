import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppViteProdService } from './vite-prod.service';

describe('AngularAppViteProdService', () => {
    let service: AngularAppViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppViteProdService],
        }).compile();

        service = module.get<AngularAppViteProdService>(AngularAppViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
