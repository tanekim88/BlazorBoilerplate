import { Test } from '@nestjs/testing';
import { BlazorAppViteProdService } from './vite-prod.service';
describe('BlazorAppViteProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppViteProdService],
        }).compile();
        service = module.get(BlazorAppViteProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-prod.service.spec.js.map