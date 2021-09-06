import { Test } from '@nestjs/testing';
import { TailwindcssService } from './tailwindcss.service';
describe('TailwindcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TailwindcssService],
        }).compile();
        service = module.get(TailwindcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tailwindcss.service.spec.js.map