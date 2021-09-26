import { Test } from '@nestjs/testing';
import { ViteBaseService } from './vite-base.service';
describe('ViteBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ViteBaseService],
        }).compile();
        service = module.get(ViteBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-base.service.spec.js.map