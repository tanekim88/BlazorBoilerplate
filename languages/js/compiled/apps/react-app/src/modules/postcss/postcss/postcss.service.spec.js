import { Test } from '@nestjs/testing';
import { ReactAppPostcssService } from './postcss.service';
describe('ReactAppPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppPostcssService],
        }).compile();
        service = module.get(ReactAppPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map