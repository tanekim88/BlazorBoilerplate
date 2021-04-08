"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_service_1 = require("./webpack-postcss.service");
describe('WebpackPostcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_service_1.WebpackPostcssService],
        }).compile();
        service = module.get(webpack_postcss_service_1.WebpackPostcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss.service.spec.js.map