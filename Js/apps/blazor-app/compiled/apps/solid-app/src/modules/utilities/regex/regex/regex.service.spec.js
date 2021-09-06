import { Test } from '@nestjs/testing';
import { SolidAppRegexService } from './regex.service';
describe('SolidAppRegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppRegexService],
        }).compile();
        service = module.get(SolidAppRegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map