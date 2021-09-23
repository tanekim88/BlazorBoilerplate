import { Test } from '@nestjs/testing';
import { SolidAppVitePluginsService } from './vite-plugins.service';
describe('SolidAppVitePluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppVitePluginsService],
        }).compile();
        service = module.get(SolidAppVitePluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugins.service.spec.js.map