import { Test } from '@nestjs/testing';
import { WebpackSvgRulesService } from './webpack-svg-rules.service';
describe('WebpackSvgRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSvgRulesService],
        }).compile();
        service = module.get(WebpackSvgRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=svg-rules.service.spec.js.map