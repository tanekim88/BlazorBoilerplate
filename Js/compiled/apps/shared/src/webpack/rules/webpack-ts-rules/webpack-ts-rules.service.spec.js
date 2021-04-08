"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_ts_rules_service_1 = require("./webpack-ts-rules.service");
describe('WebpackTsRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_ts_rules_service_1.WebpackTsRulesService],
        }).compile();
        service = module.get(webpack_ts_rules_service_1.WebpackTsRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-ts-rules.service.spec.js.map