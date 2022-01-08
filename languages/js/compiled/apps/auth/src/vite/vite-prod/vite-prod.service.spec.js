import { Test } from '@nestjs/testing';
import { AuthViteProdService } from './vite-prod.service';
describe('AuthViteProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthViteProdService],
        }).compile();
        service = module.get(AuthViteProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-prod.service.spec.js.map