import { Test, TestingModule } from '@nestjs/testing';
import { WebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';

describe('WebpackCleanWebpackPluginService', () => {
    let service: WebpackCleanWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackCleanWebpackPluginService],
        }).compile();

        service = module.get<WebpackCleanWebpackPluginService>(WebpackCleanWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
