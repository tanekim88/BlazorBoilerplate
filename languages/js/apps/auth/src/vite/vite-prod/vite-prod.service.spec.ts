import { Test, TestingModule } from '@nestjs/testing';
import { AuthViteProdService } from './vite-prod.service';

describe('AuthViteProdService', () => {
    let service: AuthViteProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthViteProdService],
        }).compile();

        service = module.get<AuthViteProdService>(AuthViteProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
