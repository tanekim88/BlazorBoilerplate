import { Test } from '@nestjs/testing';
import { VitePluginsService } from './vite-plugins.service';
describe('VitePluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [VitePluginsService],
        }).compile();
        service = module.get(VitePluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugins.service.spec.js.map