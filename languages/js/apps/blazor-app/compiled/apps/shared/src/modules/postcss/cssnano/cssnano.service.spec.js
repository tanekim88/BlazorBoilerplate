import { Test } from '@nestjs/testing';
import { CssnanoService } from './cssnano.service';
describe('CssnanoService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CssnanoService],
        }).compile();
        service = module.get(CssnanoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=cssnano.service.spec.js.map