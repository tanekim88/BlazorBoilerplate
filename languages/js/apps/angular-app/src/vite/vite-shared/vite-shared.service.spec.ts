import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppViteSharedService } from './vite-shared.service';

describe('AngularAppViteSharedService', () => {
    let service: AngularAppViteSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppViteSharedService],
        }).compile();

        service = module.get<AngularAppViteSharedService>(AngularAppViteSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
