import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackDevService } from './webpack-dev.service';

describe('AuthWebpackDevService', () => {
    let service: AuthWebpackDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackDevService],
        }).compile();

        service = module.get<AuthWebpackDevService>(AuthWebpackDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
