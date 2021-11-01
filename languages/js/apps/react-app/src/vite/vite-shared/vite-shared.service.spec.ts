import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppViteSharedService } from './vite-shared.service';

describe('ReactAppViteSharedService', () => {
    let service: ReactAppViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppViteSharedService],
        }).compile();

        service = module.get<ReactAppViteSharedService>(ReactAppViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
