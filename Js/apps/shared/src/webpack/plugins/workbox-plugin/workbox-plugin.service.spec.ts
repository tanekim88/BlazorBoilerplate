import { Test, TestingModule } from '@nestjs/testing';
import { WebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin.service';

describe('WebpackWorkboxWebpackPluginService', () => {
    let service: WebpackWorkboxWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackWorkboxWebpackPluginService],
        }).compile();

        service = module.get<WebpackWorkboxWebpackPluginService>(WebpackWorkboxWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
