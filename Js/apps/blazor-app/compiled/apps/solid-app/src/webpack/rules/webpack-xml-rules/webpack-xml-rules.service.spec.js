import { Test } from '@nestjs/testing';
import { SolidAppWebpackXmlRulesService } from './webpack-xml-rules.service';
describe('SolidAppWebpackXmlRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackXmlRulesService],
        }).compile();
        service = module.get(SolidAppWebpackXmlRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-xml-rules.service.spec.js.map