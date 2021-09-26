import { Test } from '@nestjs/testing';
import { BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin.service';
describe('BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath],
        }).compile();
        service = module.get(BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-plugin.service.spec.js.map