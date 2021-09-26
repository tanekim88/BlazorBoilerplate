import { Test, TestingModule } from '@nestjs/testing';
import { ViteBaseService } from './vite-base.service';

describe('ViteBaseService', () => {
    let service: ViteBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ViteBaseService],
        }).compile();

        service = module.get<ViteBaseService>(ViteBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
