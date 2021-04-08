"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_prod_service_1 = require("./webpack-prod.service");
describe('AuthWebpackProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_prod_service_1.AuthWebpackProdService],
        }).compile();
        service = module.get(webpack_prod_service_1.AuthWebpackProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-prod.service.spec.js.map