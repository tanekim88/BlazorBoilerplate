"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_each_service_1 = require("./webpack-postcss-each.service");
describe('WebpackPostcssEachService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_each_service_1.WebpackPostcssEachService],
        }).compile();
        service = module.get(webpack_postcss_each_service_1.WebpackPostcssEachService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-each.service.spec.js.map