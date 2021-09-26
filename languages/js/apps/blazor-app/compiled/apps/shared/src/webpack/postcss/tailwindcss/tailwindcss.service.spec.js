import { Test } from '@nestjs/testing';
import { WebpackTailwindcssService } from './webpack-tailwindcss.service';
describe('WebpackTailwindcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackTailwindcssService],
        }).compile();
        service = module.get(WebpackTailwindcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tailwindcss.service.spec.js.map