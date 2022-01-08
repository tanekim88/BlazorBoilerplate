import { Test } from '@nestjs/testing';
import { ReactAppViteProdService } from './vite-prod.service';
describe('ReactAppViteProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppViteProdService],
        }).compile();
        service = module.get(ReactAppViteProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-prod.service.spec.js.map