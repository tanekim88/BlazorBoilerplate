import { Test } from '@nestjs/testing';
import { WebpackImageRulesService } from './webpack-image-rules.service';
describe('WebpackImageRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackImageRulesService],
        }).compile();
        service = module.get(WebpackImageRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=image-rules.service.spec.js.map