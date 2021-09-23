import { Test } from '@nestjs/testing';
import { SolidAppViteSharedService } from './vite-shared.service';
describe('SolidAppViteSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppViteSharedService],
        }).compile();
        service = module.get(SolidAppViteSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-shared.service.spec.js.map