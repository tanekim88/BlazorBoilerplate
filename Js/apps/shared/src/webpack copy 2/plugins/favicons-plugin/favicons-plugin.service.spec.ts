import { Test, TestingModule } from '@nestjs/testing';
import { WebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';

describe('WebpackFaviconsWebpackPluginService', () => {
    let service: WebpackFaviconsWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackFaviconsWebpackPluginService],
        }).compile();

        service = module.get<WebpackFaviconsWebpackPluginService>(WebpackFaviconsWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
