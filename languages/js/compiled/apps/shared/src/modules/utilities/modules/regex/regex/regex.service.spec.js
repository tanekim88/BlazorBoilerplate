import { Test } from '@nestjs/testing';
import { RegexService } from './regex.service';
describe('RegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [RegexService],
        }).compile();
        service = module.get(RegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map