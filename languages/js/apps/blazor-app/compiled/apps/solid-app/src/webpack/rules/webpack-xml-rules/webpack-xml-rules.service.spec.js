import { Test } from '@nestjs/testing';
import { BlazorAppWebpackXmlRulesService } from './webpack-xml-rules.service';
describe('BlazorAppWebpackXmlRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackXmlRulesService],
        }).compile();
        service = module.get(BlazorAppWebpackXmlRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-xml-rules.service.spec.js.map