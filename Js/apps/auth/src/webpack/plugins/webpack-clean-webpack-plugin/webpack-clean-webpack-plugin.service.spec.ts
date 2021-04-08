import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';

describe('AuthWebpackCleanWebpackPluginService', () => {
    let service: AuthWebpackCleanWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackCleanWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackCleanWebpackPluginService>(AuthWebpackCleanWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
