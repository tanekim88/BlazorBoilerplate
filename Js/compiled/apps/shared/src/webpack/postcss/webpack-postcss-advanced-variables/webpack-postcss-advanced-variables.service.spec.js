"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_advanced_variables_service_1 = require("./webpack-postcss-advanced-variables.service");
describe('WebpackPostcssAdvancedVariablesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_advanced_variables_service_1.WebpackPostcssAdvancedVariablesService],
        }).compile();
        service = module.get(webpack_postcss_advanced_variables_service_1.WebpackPostcssAdvancedVariablesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-advanced-variables.service.spec.js.map