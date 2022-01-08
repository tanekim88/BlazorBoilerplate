import { Test } from '@nestjs/testing';
import { ReactAppViteSharedService } from './vite-shared.service';
describe('ReactAppViteSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppViteSharedService],
        }).compile();
        service = module.get(ReactAppViteSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-shared.service.spec.js.map