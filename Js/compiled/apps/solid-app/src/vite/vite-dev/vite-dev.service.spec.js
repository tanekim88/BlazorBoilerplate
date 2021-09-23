import { Test } from '@nestjs/testing';
import { SolidAppViteDevService } from './vite-dev.service';
describe('SolidAppViteDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppViteDevService],
        }).compile();
        service = module.get(SolidAppViteDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-dev.service.spec.js.map