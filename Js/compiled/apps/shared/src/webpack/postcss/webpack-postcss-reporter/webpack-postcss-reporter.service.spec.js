"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_reporter_service_1 = require("./webpack-postcss-reporter.service");
describe('WebpackPostcssReporterService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_reporter_service_1.WebpackPostcssReporterService],
        }).compile();
        service = module.get(webpack_postcss_reporter_service_1.WebpackPostcssReporterService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-reporter.service.spec.js.map