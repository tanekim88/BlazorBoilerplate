import { Test } from '@nestjs/testing';
import { VitePluginBaseService } from './vite-plugin-base.service';
describe('VitePluginBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [VitePluginBaseService],
        }).compile();
        service = module.get(VitePluginBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugin-base.service.spec.js.map