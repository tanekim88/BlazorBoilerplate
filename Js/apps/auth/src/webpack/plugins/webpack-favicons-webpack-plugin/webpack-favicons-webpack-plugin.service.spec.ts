import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';

describe('AuthWebpackFaviconsWebpackPluginService', () => {
    let service: AuthWebpackFaviconsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackFaviconsWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackFaviconsWebpackPluginService>(
            AuthWebpackFaviconsWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
