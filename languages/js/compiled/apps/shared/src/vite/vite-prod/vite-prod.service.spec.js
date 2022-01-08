import { Test } from '@nestjs/testing';
import { ViteProdService } from './vite-prod.service';
describe('ViteProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ViteProdService],
        }).compile();
        service = module.get(ViteProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-prod.service.spec.js.map