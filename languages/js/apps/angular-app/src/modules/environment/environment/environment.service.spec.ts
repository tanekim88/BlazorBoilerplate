import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppEnvironmentService } from './environment.service';

describe('AngularAppEnvironmentService', () => {
    let service: AngularAppEnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppEnvironmentService],
        }).compile();

        service = module.get<AngularAppEnvironmentService>(AngularAppEnvironmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
