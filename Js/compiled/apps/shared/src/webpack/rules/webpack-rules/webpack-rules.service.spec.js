"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_rules_service_1 = require("./webpack-rules.service");
describe('WebpackRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_rules_service_1.WebpackRulesService],
        }).compile();
        service = module.get(webpack_rules_service_1.WebpackRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rules.service.spec.js.map