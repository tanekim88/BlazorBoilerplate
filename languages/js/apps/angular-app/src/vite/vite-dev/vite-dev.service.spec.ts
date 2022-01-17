import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppViteDevService } from './vite-dev.service';

describe('AngularAppViteDevService', () => {
    let service: AngularAppViteDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppViteDevService],
        }).compile();

        service = module.get<AngularAppViteDevService>(AngularAppViteDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
