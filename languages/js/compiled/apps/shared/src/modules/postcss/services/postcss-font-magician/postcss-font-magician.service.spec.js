import { Test } from '@nestjs/testing';
import { PostcssFontMagicianService } from './postcss-font-magician.service';
describe('PostcssFontMagicianService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssFontMagicianService],
        }).compile();
        service = module.get(PostcssFontMagicianService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-font-magician.service.spec.js.map