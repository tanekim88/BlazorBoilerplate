import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackSharedConfigService } from './webpack-shared-config.service';

describe('AuthWebpackSharedConfigService', () => {
    let service: AuthWebpackSharedConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackSharedConfigService],
        }).compile();

        service = module.get<AuthWebpackSharedConfigService>(AuthWebpackSharedConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
