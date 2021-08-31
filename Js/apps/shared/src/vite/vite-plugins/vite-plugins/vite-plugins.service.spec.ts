import { Test, TestingModule } from '@nestjs/testing';
import { VitePluginsService } from './vite-plugins.service';

describe('VitePluginsService', () => {
    let service: VitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VitePluginsService],
        }).compile();

        service = module.get<VitePluginsService>(VitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
