import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPluginsService } from './webpack-plugins.service';

describe('WebpackPluginsService', () => {
    let service: WebpackPluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPluginsService],
        }).compile();

        service = module.get<WebpackPluginsService>(WebpackPluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
