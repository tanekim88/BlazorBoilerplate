import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppEnvironmentService } from './environment.service';

describe('ReactAppEnvironmentService', () => {
    let service: ReactAppEnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppEnvironmentService],
        }).compile();

        service = module.get<ReactAppEnvironmentService>(ReactAppEnvironmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
