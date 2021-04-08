"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_xml_rules_service_1 = require("./webpack-xml-rules.service");
describe('AuthWebpackXmlRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_xml_rules_service_1.AuthWebpackXmlRulesService],
        }).compile();
        service = module.get(webpack_xml_rules_service_1.AuthWebpackXmlRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-xml-rules.service.spec.js.map