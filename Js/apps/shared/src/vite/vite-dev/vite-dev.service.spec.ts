import { Test, TestingModule } from '@nestjs/testing';
import { ViteDevService } from './vite-dev.service';

describe('ViteDevService', () => {
    let service: ViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ViteDevService],
        }).compile();

        service = module.get<ViteDevService>(ViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
