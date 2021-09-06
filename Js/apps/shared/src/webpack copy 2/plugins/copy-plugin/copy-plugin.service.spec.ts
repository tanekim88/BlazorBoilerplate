import { Test, TestingModule } from '@nestjs/testing';
import { WebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';

describe('WebpackCopyWebpackPluginService', () => {
    let service: WebpackCopyWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackCopyWebpackPluginService],
        }).compile();

        service = module.get<WebpackCopyWebpackPluginService>(WebpackCopyWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
