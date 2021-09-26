import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppViteDevService } from './vite-dev.service';

describe('SolidAppViteDevService', () => {
    let service: SolidAppViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppViteDevService],
        }).compile();

        service = module.get<SolidAppViteDevService>(SolidAppViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
