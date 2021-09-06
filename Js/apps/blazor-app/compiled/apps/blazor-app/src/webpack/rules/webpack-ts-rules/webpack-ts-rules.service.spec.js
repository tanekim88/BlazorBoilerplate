import { Test } from '@nestjs/testing';
import { BlazorAppWebpackTsRulesService } from './webpack-ts-rules.service';
describe('BlazorAppWebpackTsRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackTsRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackTsRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-ts-rules.service.spec.js.map