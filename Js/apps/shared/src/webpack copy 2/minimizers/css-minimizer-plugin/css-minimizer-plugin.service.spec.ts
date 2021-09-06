import { Test, TestingModule } from '@nestjs/testing';
import { WebpackCssMinimizerPluginService } from './webpack-css-minimizer-plugin.service';

describe('WebpackCssMinimizerPluginService', () => {
    let service: WebpackCssMinimizerPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackCssMinimizerPluginService],
        }).compile();

        service = module.get<WebpackCssMinimizerPluginService>(WebpackCssMinimizerPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
