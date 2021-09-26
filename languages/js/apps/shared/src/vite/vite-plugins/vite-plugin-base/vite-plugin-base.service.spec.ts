import { Test, TestingModule } from '@nestjs/testing';
import { VitePluginBaseService } from './vite-plugin-base.service';

describe('VitePluginBaseService', () => {
    let service: VitePluginBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VitePluginBaseService],
        }).compile();

        service = module.get<VitePluginBaseService>(VitePluginBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
