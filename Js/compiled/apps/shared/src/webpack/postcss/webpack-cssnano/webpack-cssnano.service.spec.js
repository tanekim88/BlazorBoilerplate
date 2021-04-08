"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_cssnano_service_1 = require("./webpack-cssnano.service");
describe('WebpackCssnanoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_cssnano_service_1.WebpackCssnanoService],
        }).compile();
        service = module.get(webpack_cssnano_service_1.WebpackCssnanoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-cssnano.service.spec.js.map