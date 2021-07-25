import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppViteSharedService } from './vite-shared.service';

describe('BlazorAppViteSharedService', () => {
    let service: BlazorAppViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppViteSharedService],
        }).compile();

        service = module.get<BlazorAppViteSharedService>(BlazorAppViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
