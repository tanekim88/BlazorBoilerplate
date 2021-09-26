import { Test } from '@nestjs/testing';
import { AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin.service';
describe('AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath],
        }).compile();
        service = module.get(AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-plugin.service.spec.js.map