import { Test } from '@nestjs/testing';
import { SolidAppWebpackMiniCssExtractPluginConfigService } from './webpack-mini-css-extract-plugin.service';
describe('SolidAppWebpackMiniCssExtractPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackMiniCssExtractPluginConfigService],
        }).compile();
        service = module.get(SolidAppWebpackMiniCssExtractPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.spec.js.map