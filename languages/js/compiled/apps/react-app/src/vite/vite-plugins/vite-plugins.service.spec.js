import { Test } from '@nestjs/testing';
import { ReactAppVitePluginsService } from './vite-plugins.service';
describe('ReactAppVitePluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppVitePluginsService],
        }).compile();
        service = module.get(ReactAppVitePluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugins.service.spec.js.map