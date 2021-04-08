import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackPreRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';

describe('AuthWebpackPreRemoveFilesWebpackPluginService', () => {
    let service: AuthWebpackPreRemoveFilesWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackPreRemoveFilesWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackPreRemoveFilesWebpackPluginService>(
            AuthWebpackPreRemoveFilesWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
