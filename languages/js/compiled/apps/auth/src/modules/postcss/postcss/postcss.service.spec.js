import { Test } from '@nestjs/testing';
import { AuthPostcssService } from './postcss.service';
describe('AuthPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthPostcssService],
        }).compile();
        service = module.get(AuthPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss.service.spec.js.map