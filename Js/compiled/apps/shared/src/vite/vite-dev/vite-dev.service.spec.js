import { Test } from '@nestjs/testing';
import { ViteDevService } from './vite-dev.service';
describe('ViteDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ViteDevService],
        }).compile();
        service = module.get(ViteDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-dev.service.spec.js.map