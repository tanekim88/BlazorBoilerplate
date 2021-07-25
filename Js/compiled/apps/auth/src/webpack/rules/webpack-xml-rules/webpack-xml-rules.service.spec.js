import { Test } from '@nestjs/testing';
import { AuthWebpackXmlRulesService } from './webpack-xml-rules.service';
describe('AuthWebpackXmlRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackXmlRulesService],
        }).compile();
        service = module.get(AuthWebpackXmlRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-xml-rules.service.spec.js.map