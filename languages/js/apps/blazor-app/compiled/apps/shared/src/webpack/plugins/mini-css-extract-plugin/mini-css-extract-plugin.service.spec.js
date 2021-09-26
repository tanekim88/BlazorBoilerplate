import { Test } from '@nestjs/testing';
import { WebpackMiniCssExtractPluginService } from './webpack-mini-css-extract-plugin.service';
describe('WebpackMiniCssExtractPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackMiniCssExtractPluginService],
        }).compile();
        service = module.get(WebpackMiniCssExtractPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=mini-css-extract-plugin.service.spec.js.map