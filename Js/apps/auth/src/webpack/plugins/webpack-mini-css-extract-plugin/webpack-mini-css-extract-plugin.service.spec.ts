import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackMiniCssExtractPluginConfigService } from './webpack-mini-css-extract-plugin.service';

describe('AuthWebpackMiniCssExtractPluginConfigService', () => {
    let service: AuthWebpackMiniCssExtractPluginConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackMiniCssExtractPluginConfigService],
        }).compile();

        service = module.get<AuthWebpackMiniCssExtractPluginConfigService>(AuthWebpackMiniCssExtractPluginConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
