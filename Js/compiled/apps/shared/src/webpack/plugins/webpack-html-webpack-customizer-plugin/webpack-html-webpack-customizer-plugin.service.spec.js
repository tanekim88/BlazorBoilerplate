import { Test } from '@nestjs/testing';
import { WebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin.service';
describe('WebpackHtmlWebpackCustomizerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackHtmlWebpackCustomizerPluginService],
        }).compile();
        service = module.get(WebpackHtmlWebpackCustomizerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.spec.js.map