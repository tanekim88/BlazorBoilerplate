import { Test } from '@nestjs/testing';
import { SolidAppViteProdService } from './vite-prod.service';
describe('SolidAppViteProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppViteProdService],
        }).compile();
        service = module.get(SolidAppViteProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-prod.service.spec.js.map