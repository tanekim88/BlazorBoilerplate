import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppEnvironmentService } from './environment.service';

describe('BlazorAppEnvironmentService', () => {
    let service: BlazorAppEnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppEnvironmentService],
        }).compile();

        service = module.get<BlazorAppEnvironmentService>(BlazorAppEnvironmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
