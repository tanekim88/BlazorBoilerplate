import { Test, TestingModule } from '@nestjs/testing';
import { WebpackClosureWebpackPluginService } from './webpack-closure-plugin.service';

describe('WebpackClosureWebpackPluginService', () => {
    let service: WebpackClosureWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackClosureWebpackPluginService],
        }).compile();

        service = module.get<WebpackClosureWebpackPluginService>(WebpackClosureWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
