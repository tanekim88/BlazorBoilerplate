"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_import_service_1 = require("./webpack-postcss-import.service");
describe('WebpackPostcssImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_import_service_1.WebpackPostcssImportService],
        }).compile();
        service = module.get(webpack_postcss_import_service_1.WebpackPostcssImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-import.service.spec.js.map