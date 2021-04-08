"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_csv_rules_service_1 = require("./webpack-csv-rules.service");
describe('AuthWebpackCsvRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_csv_rules_service_1.AuthWebpackCsvRulesService],
        }).compile();
        service = module.get(webpack_csv_rules_service_1.AuthWebpackCsvRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-csv-rules.service.spec.js.map