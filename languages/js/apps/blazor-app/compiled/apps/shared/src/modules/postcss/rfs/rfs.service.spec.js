import { Test } from '@nestjs/testing';
import { RfsService } from './rfs.service';
describe('RfsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [RfsService],
        }).compile();
        service = module.get(RfsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=rfs.service.spec.js.map