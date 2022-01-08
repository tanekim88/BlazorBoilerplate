import { Test, TestingModule } from '@nestjs/testing';
import { AuthViteSharedService } from './vite-shared.service';

describe('AuthViteSharedService', () => {
    let service: AuthViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthViteSharedService],
        }).compile();

        service = module.get<AuthViteSharedService>(AuthViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
