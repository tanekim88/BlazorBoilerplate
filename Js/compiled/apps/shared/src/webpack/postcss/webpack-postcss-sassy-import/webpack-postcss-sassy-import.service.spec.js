"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_sassy_import_service_1 = require("./webpack-postcss-sassy-import.service");
describe('WebpackPostcssSassyImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_sassy_import_service_1.WebpackPostcssSassyImportService],
        }).compile();
        service = module.get(webpack_postcss_sassy_import_service_1.WebpackPostcssSassyImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-sassy-import.service.spec.js.map