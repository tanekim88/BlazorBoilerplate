"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_base_service_1 = require("./webpack-base.service");
describe('WebpackBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_base_service_1.WebpackBaseService],
        }).compile();
        service = module.get(webpack_base_service_1.WebpackBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-base.service.spec.js.map