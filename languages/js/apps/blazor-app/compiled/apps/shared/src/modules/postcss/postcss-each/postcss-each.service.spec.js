import { Test } from '@nestjs/testing';
import { PostcssEachService } from './postcss-each.service';
describe('PostcssEachService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssEachService],
        }).compile();
        service = module.get(PostcssEachService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-each.service.spec.js.map