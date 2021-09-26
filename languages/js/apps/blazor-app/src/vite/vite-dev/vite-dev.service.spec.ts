import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppViteDevService } from './vite-dev.service';

describe('BlazorAppViteDevService', () => {
    let service: BlazorAppViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppViteDevService],
        }).compile();

        service = module.get<BlazorAppViteDevService>(BlazorAppViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
