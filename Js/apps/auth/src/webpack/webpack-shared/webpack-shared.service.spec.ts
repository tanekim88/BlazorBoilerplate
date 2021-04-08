import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackSharedService } from './webpack-shared.service';

describe('AuthWebpackSharedService', () => {
    let service: AuthWebpackSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackSharedService],
        }).compile();

        service = module.get<AuthWebpackSharedService>(AuthWebpackSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
