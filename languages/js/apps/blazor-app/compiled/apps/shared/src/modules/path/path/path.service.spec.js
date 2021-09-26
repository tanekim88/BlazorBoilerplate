import { Test } from '@nestjs/testing';
import { PathService } from './path.service';
describe('PathService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PathService],
        }).compile();
        service = module.get(PathService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=path.service.spec.js.map