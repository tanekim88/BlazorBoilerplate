import { Test } from '@nestjs/testing';
import { WebpackStyleRulesService } from './webpack-style-rules.service';
describe('WebpackStyleRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackStyleRulesService],
        }).compile();
        service = module.get(WebpackStyleRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=style-rules.service.spec.js.map