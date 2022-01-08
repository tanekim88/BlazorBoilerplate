import { Test } from '@nestjs/testing';
import { AuthViteDevService } from './vite-dev.service';
describe('AuthViteDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthViteDevService],
        }).compile();
        service = module.get(AuthViteDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-dev.service.spec.js.map