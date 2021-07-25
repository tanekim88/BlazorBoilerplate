import { Test } from '@nestjs/testing';
import { BlazorAppWebpackMiniCssExtractPluginConfigService } from './webpack-mini-css-extract-plugin.service';
describe('BlazorAppWebpackMiniCssExtractPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackMiniCssExtractPluginConfigService],
        }).compile();
        service = module.get(BlazorAppWebpackMiniCssExtractPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.spec.js.map