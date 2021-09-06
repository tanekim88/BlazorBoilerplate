import { Test, TestingModule } from '@nestjs/testing';
import { WebpackMiniCssExtractPluginService } from './webpack-mini-css-extract-plugin.service';

describe('WebpackMiniCssExtractPluginService', () => {
    let service: WebpackMiniCssExtractPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackMiniCssExtractPluginService],
        }).compile();

        service = module.get<WebpackMiniCssExtractPluginService>(WebpackMiniCssExtractPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
