import { Test, TestingModule } from '@nestjs/testing';
import { WebpackHtmlWebpackPluginService } from './webpack-html-webpack-plugin.service';

describe('WebpackHtmlWebpackPluginService', () => {
    let service: WebpackHtmlWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackHtmlWebpackPluginService],
        }).compile();

        service = module.get<WebpackHtmlWebpackPluginService>(WebpackHtmlWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
