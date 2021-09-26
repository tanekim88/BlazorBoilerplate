import { Test } from '@nestjs/testing';
import { PostcssBaseService } from './postcss-base.service';
describe('PostcssBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssBaseService],
        }).compile();
        service = module.get(PostcssBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-base.service.spec.js.map