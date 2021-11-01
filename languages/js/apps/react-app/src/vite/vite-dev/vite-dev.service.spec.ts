import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppViteDevService } from './vite-dev.service';

describe('ReactAppViteDevService', () => {
    let service: ReactAppViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppViteDevService],
        }).compile();

        service = module.get<ReactAppViteDevService>(ReactAppViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
