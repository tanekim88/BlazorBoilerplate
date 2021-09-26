import { Test, TestingModule } from '@nestjs/testing';
import { VitePluginGlobInputService } from './vite-plugin-glob-input.service';


describe('VitePluginGlobInputService', () => {
    let service: VitePluginGlobInputService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VitePluginGlobInputService],
        }).compile();

        service = module.get<VitePluginGlobInputService>(VitePluginGlobInputService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
