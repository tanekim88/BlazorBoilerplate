import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin.service';

describe('AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath', () => {
    let service: AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath],
        }).compile();

        service = module.get<AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath>(
            AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
