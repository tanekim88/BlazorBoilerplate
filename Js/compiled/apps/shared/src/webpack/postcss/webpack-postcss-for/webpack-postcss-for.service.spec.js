"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_for_service_1 = require("./webpack-postcss-for.service");
describe('WebpackPostcssForService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_for_service_1.WebpackPostcssForService],
        }).compile();
        service = module.get(webpack_postcss_for_service_1.WebpackPostcssForService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-for.service.spec.js.map