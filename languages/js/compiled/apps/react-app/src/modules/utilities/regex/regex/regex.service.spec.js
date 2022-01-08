import { Test } from '@nestjs/testing';
import { ReactAppRegexService } from './regex.service';
describe('ReactAppRegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppRegexService],
        }).compile();
        service = module.get(ReactAppRegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map