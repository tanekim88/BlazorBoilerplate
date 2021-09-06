import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppViteSharedService } from './vite-shared.service';

describe('SolidAppViteSharedService', () => {
    let service: SolidAppViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppViteSharedService],
        }).compile();

        service = module.get<SolidAppViteSharedService>(SolidAppViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
