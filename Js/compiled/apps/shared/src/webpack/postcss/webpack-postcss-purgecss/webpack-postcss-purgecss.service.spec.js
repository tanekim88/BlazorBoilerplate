"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_purgecss_service_1 = require("./webpack-postcss-purgecss.service");
describe('WebpackPostcssPurgecssService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_purgecss_service_1.WebpackPostcssPurgecssService],
        }).compile();
        service = module.get(webpack_postcss_purgecss_service_1.WebpackPostcssPurgecssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-purgecss.service.spec.js.map