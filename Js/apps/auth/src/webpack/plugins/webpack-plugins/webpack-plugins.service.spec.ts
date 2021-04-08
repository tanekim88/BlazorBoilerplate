import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackPluginsConfigService } from './webpack-plugins.service';

describe('AuthWebpackPluginsConfigService', () => {
    let service: AuthWebpackPluginsConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackPluginsConfigService],
        }).compile();

        service = module.get<AuthWebpackPluginsConfigService>(AuthWebpackPluginsConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
