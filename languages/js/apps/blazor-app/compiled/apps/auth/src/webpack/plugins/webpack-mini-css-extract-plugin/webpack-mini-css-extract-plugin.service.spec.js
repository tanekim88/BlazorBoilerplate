import { Test } from '@nestjs/testing';
import { AuthWebpackMiniCssExtractPluginConfigService } from './webpack-mini-css-extract-plugin.service';
describe('AuthWebpackMiniCssExtractPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackMiniCssExtractPluginConfigService],
        }).compile();
        service = module.get(AuthWebpackMiniCssExtractPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.spec.js.map