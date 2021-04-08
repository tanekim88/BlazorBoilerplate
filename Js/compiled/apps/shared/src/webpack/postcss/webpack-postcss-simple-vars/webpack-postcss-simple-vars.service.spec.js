"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_simple_vars_service_1 = require("./webpack-postcss-simple-vars.service");
describe('WebpackPostcssSimpleVarsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_simple_vars_service_1.WebpackPostcssSimpleVarsService],
        }).compile();
        service = module.get(webpack_postcss_simple_vars_service_1.WebpackPostcssSimpleVarsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-simple-vars.service.spec.js.map