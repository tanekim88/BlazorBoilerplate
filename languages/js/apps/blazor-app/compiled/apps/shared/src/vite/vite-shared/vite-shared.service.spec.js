import { Test } from '@nestjs/testing';
import { ViteSharedService } from './vite-shared.service';
describe('ViteSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ViteSharedService],
        }).compile();
        service = module.get(ViteSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-shared.service.spec.js.map