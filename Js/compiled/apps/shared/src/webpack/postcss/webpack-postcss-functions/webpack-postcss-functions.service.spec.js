"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_functions_service_1 = require("./webpack-postcss-functions.service");
describe('WebpackPostcssFunctionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_functions_service_1.WebpackPostcssFunctionsService],
        }).compile();
        service = module.get(webpack_postcss_functions_service_1.WebpackPostcssFunctionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-functions.service.spec.js.map