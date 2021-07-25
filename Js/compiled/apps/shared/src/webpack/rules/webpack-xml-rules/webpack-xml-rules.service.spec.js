import { Test } from '@nestjs/testing';
import { WebpackXmlRulesService } from './webpack-xml-rules.service';
describe('WebpackXmlRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackXmlRulesService],
        }).compile();
        service = module.get(WebpackXmlRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-xml-rules.service.spec.js.map