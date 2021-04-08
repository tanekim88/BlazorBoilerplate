"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_conditionals_service_1 = require("./webpack-postcss-conditionals.service");
describe('WebpackPostcssConditionalsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_conditionals_service_1.WebpackPostcssConditionalsService],
        }).compile();
        service = module.get(webpack_postcss_conditionals_service_1.WebpackPostcssConditionalsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-conditionals.service.spec.js.map