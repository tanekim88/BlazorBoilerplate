import { Test } from '@nestjs/testing';
import { WebpackStylelintService } from './webpack-stylelint.service';
describe('WebpackStylelintService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackStylelintService],
        }).compile();
        service = module.get(WebpackStylelintService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=stylelint.service.spec.js.map