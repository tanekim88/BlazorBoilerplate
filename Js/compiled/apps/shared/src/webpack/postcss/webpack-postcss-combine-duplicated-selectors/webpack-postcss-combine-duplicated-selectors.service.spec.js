"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_combine_duplicated_selectors_service_1 = require("./webpack-postcss-combine-duplicated-selectors.service");
describe('WebpackPostcssCombineDuplicatedSelectorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_combine_duplicated_selectors_service_1.WebpackPostcssCombineDuplicatedSelectorsService],
        }).compile();
        service = module.get(webpack_postcss_combine_duplicated_selectors_service_1.WebpackPostcssCombineDuplicatedSelectorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-combine-duplicated-selectors.service.spec.js.map