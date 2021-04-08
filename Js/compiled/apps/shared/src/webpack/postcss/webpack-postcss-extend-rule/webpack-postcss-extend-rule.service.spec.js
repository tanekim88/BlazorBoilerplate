"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_extend_rule_service_1 = require("./webpack-postcss-extend-rule.service");
describe('WebpackPostcssExtendRuleService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_extend_rule_service_1.WebpackPostcssExtendRuleService],
        }).compile();
        service = module.get(webpack_postcss_extend_rule_service_1.WebpackPostcssExtendRuleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-extend-rule.service.spec.js.map