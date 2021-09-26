import { Test } from '@nestjs/testing';
import { PostcssService } from './postcss.service';
describe('PostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssService],
        }).compile();
        service = module.get(PostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map