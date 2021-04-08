"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_minimizers_service_1 = require("./webpack-minimizers.service");
describe('WebpackMinimizersService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_minimizers_service_1.WebpackMinimizersService],
        }).compile();
        service = module.get(webpack_minimizers_service_1.WebpackMinimizersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-minimizers.service.spec.js.map