import { Test } from '@nestjs/testing';
import { PostcssPurgecssService } from './postcss-purgecss.service';
describe('PostcssPurgecssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssPurgecssService],
        }).compile();
        service = module.get(PostcssPurgecssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-purgecss.service.spec.js.map