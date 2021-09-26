import { Test } from '@nestjs/testing';
import { AuthRegexService } from './regex.service';
describe('AuthRegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthRegexService],
        }).compile();
        service = module.get(AuthRegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map