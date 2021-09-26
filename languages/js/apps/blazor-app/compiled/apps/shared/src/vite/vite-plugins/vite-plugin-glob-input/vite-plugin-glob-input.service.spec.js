import { Test } from '@nestjs/testing';
import { VitePluginGlobInputService } from './vite-plugin-glob-input.service';
describe('VitePluginGlobInputService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [VitePluginGlobInputService],
        }).compile();
        service = module.get(VitePluginGlobInputService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugin-glob-input.service.spec.js.map