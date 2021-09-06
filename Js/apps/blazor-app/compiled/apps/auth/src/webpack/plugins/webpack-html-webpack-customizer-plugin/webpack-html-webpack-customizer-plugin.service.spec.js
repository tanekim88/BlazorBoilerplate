import { Test } from '@nestjs/testing';
import { AuthWebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin.service';
describe('AuthWebpackHtmlWebpackCustomizerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackHtmlWebpackCustomizerPluginService],
        }).compile();
        service = module.get(AuthWebpackHtmlWebpackCustomizerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.spec.js.map