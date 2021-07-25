import { Test, TestingModule } from '@nestjs/testing';
import { ViteSharedService } from './vite-shared.service';

describe('ViteSharedService', () => {
    let service: ViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ViteSharedService],
        }).compile();

        service = module.get<ViteSharedService>(ViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
