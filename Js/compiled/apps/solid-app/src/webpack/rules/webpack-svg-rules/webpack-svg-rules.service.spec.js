import { Test } from '@nestjs/testing';
import { BlazorAppWebpackSvgRulesService } from './webpack-svg-rules.service';
describe('BlazorAppWebpackSvgRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackSvgRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackSvgRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-rules.service.spec.js.map