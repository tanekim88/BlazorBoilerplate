import { Test, TestingModule } from '@nestjs/testing';
import { AuthViteDevService } from './vite-dev.service';

describe('AuthViteDevService', () => {
    let service: AuthViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthViteDevService],
        }).compile();

        service = module.get<AuthViteDevService>(AuthViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
