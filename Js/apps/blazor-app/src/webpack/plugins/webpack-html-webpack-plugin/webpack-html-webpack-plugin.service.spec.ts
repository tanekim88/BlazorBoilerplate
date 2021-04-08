import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin.service';

describe('BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath', () => {
    let service: BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath],
        }).compile();

        service = module.get<BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath>(
            BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
