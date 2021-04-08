import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin.service';

describe('AuthWebpackHtmlWebpackCustomizerPluginService', () => {
    let service: AuthWebpackHtmlWebpackCustomizerPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackHtmlWebpackCustomizerPluginService],
        }).compile();

        service = module.get<AuthWebpackHtmlWebpackCustomizerPluginService>(
            AuthWebpackHtmlWebpackCustomizerPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
