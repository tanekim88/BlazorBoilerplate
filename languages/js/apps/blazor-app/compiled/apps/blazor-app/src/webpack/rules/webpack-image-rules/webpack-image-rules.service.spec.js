import { Test } from '@nestjs/testing';
import { BlazorAppWebpackImageRulesService } from './webpack-image-rules.service';
describe('BlazorAppWebpackImageRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackImageRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackImageRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-image-rules.service.spec.js.map