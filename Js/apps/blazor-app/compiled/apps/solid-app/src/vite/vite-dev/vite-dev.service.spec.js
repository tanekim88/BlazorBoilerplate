import { Test } from '@nestjs/testing';
import { BlazorAppViteDevService } from './vite-dev.service';
describe('BlazorAppViteDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppViteDevService],
        }).compile();
        service = module.get(BlazorAppViteDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-dev.service.spec.js.map