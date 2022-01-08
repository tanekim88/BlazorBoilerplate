import { Test } from '@nestjs/testing';
import { ReactAppViteDevService } from './vite-dev.service';
describe('ReactAppViteDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppViteDevService],
        }).compile();
        service = module.get(ReactAppViteDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-dev.service.spec.js.map