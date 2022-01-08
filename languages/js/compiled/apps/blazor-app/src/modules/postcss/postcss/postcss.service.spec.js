import { Test } from '@nestjs/testing';
import { BlazorAppPostcssService } from './postcss.service';
describe('BlazorAppPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppPostcssService],
        }).compile();
        service = module.get(BlazorAppPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map