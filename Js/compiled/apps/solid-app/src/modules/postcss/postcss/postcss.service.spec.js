import { Test } from '@nestjs/testing';
import { SolidAppPostcssService } from './postcss.service';
describe('SolidAppPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppPostcssService],
        }).compile();
        service = module.get(SolidAppPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map