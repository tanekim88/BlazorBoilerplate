import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';

describe('AuthWebpackCopyWebpackPluginService', () => {
    let service: AuthWebpackCopyWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackCopyWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackCopyWebpackPluginService>(AuthWebpackCopyWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
