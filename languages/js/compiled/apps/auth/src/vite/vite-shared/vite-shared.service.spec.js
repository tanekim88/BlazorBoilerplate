import { Test } from '@nestjs/testing';
import { AuthViteSharedService } from './vite-shared.service';
describe('AuthViteSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthViteSharedService],
        }).compile();
        service = module.get(AuthViteSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-shared.service.spec.js.map