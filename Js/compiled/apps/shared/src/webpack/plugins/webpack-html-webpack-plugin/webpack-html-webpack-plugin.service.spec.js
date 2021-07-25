import { Test } from '@nestjs/testing';
import { WebpackHtmlWebpackPluginService } from './webpack-html-webpack-plugin.service';
describe('WebpackHtmlWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackHtmlWebpackPluginService],
        }).compile();
        service = module.get(WebpackHtmlWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-plugin.service.spec.js.map