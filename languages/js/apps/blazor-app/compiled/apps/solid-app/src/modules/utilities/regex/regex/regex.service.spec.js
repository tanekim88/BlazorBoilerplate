import { Test } from '@nestjs/testing';
import { BlazorAppRegexService } from './regex.service';
describe('BlazorAppRegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppRegexService],
        }).compile();
        service = module.get(BlazorAppRegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map