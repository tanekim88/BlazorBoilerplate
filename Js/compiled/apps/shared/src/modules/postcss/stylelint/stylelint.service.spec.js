import { Test } from '@nestjs/testing';
import { StylelintService } from './stylelint.service';
describe('StylelintService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [StylelintService],
        }).compile();
        service = module.get(StylelintService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=stylelint.service.spec.js.map