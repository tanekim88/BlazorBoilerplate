import { Test } from '@nestjs/testing';
import { PostcssForService } from './postcss-for.service';
describe('PostcssForService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssForService],
        }).compile();
        service = module.get(PostcssForService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-for.service.spec.js.map