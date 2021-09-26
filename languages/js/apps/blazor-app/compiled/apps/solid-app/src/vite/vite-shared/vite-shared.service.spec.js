import { Test } from '@nestjs/testing';
import { BlazorAppViteSharedService } from './vite-shared.service';
describe('BlazorAppViteSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppViteSharedService],
        }).compile();
        service = module.get(BlazorAppViteSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-shared.service.spec.js.map