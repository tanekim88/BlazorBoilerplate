import { Test } from '@nestjs/testing';
import { PostcssFunctionsService } from './postcss-functions.service';
describe('PostcssFunctionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssFunctionsService],
        }).compile();
        service = module.get(PostcssFunctionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-functions.service.spec.js.map