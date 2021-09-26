import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppEnvironmentService } from './environment.service';

describe('SolidAppEnvironmentService', () => {
    let service: SolidAppEnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppEnvironmentService],
        }).compile();

        service = module.get<SolidAppEnvironmentService>(SolidAppEnvironmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
