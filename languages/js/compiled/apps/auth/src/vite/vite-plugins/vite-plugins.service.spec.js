import { Test } from '@nestjs/testing';
import { AuthVitePluginsService } from './vite-plugins.service';
describe('AuthVitePluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthVitePluginsService],
        }).compile();
        service = module.get(AuthVitePluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugins.service.spec.js.map