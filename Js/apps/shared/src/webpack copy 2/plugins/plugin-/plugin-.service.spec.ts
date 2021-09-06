import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPluginBaseService } from './webpack-plugin-base.service';

describe('WebpackPluginBaseService', () => {
    let service: WebpackPluginBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPluginBaseService],
        }).compile();

        service = module.get<WebpackPluginBaseService>(WebpackPluginBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
