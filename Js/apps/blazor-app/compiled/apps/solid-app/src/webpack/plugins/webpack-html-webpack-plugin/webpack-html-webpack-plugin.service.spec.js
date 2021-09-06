import { Test } from '@nestjs/testing';
import { SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin.service';
describe('SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath],
        }).compile();
        service = module.get(SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-plugin.service.spec.js.map