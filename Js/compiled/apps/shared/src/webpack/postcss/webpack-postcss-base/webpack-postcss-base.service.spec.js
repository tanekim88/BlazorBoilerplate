"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_base_service_1 = require("./webpack-postcss-base.service");
describe('WebpackPostcssBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_base_service_1.WebpackPostcssBaseService],
        }).compile();
        service = module.get(webpack_postcss_base_service_1.WebpackPostcssBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-base.service.spec.js.map