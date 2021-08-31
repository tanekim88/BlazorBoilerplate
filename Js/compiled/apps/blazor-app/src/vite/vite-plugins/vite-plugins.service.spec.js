import { Test } from '@nestjs/testing';
import { BlazorAppVitePluginsService } from './vite-plugins.service';
describe('BlazorAppVitePluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppVitePluginsService],
        }).compile();
        service = module.get(BlazorAppVitePluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugins.service.spec.js.map