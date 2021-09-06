import { Test } from '@nestjs/testing';
import { SolidAppWebpackImageRulesService } from './webpack-image-rules.service';
describe('SolidAppWebpackImageRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackImageRulesService],
        }).compile();
        service = module.get(SolidAppWebpackImageRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-image-rules.service.spec.js.map