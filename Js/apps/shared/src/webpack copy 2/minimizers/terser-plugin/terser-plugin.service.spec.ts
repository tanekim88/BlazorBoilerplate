import { Test, TestingModule } from '@nestjs/testing';
import { WebpackTerserPluginService } from './webpack-terser-plugin.service';

describe('WebpackTerserPluginService', () => {
    let service: WebpackTerserPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackTerserPluginService],
        }).compile();

        service = module.get<WebpackTerserPluginService>(WebpackTerserPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
