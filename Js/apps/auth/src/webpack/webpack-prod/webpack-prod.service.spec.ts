import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackProdService } from './webpack-prod.service';

describe('AuthWebpackProdService', () => {
    let service: AuthWebpackProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackProdService],
        }).compile();

        service = module.get<AuthWebpackProdService>(AuthWebpackProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
