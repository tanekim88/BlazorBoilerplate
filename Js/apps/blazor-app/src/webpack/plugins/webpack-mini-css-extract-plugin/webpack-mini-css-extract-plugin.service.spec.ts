import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackMiniCssExtractPluginConfigService } from './webpack-mini-css-extract-plugin.service';

describe('BlazorAppWebpackMiniCssExtractPluginConfigService', () => {
    let service: BlazorAppWebpackMiniCssExtractPluginConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackMiniCssExtractPluginConfigService],
        }).compile();

        service = module.get<BlazorAppWebpackMiniCssExtractPluginConfigService>(BlazorAppWebpackMiniCssExtractPluginConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
