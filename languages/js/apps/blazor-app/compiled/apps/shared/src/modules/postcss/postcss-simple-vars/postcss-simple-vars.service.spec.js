import { Test } from '@nestjs/testing';
import { PostcssSimpleVarsService } from './postcss-simple-vars.service';
describe('PostcssSimpleVarsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssSimpleVarsService],
        }).compile();
        service = module.get(PostcssSimpleVarsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-simple-vars.service.spec.js.map