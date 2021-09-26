import { Test, TestingModule } from '@nestjs/testing';
import { AuthEnvironmentService } from './environment.service';

describe('AuthEnvironmentService', () => {
    let service: AuthEnvironmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthEnvironmentService],
        }).compile();

        service = module.get<AuthEnvironmentService>(AuthEnvironmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
