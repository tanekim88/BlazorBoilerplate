"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_stylelint_service_1 = require("./webpack-stylelint.service");
describe('WebpackStylelintService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_stylelint_service_1.WebpackStylelintService],
        }).compile();
        service = module.get(webpack_stylelint_service_1.WebpackStylelintService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-stylelint.service.spec.js.map