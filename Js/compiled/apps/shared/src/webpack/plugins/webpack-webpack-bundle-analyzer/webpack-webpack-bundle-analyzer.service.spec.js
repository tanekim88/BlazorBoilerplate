"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_webpack_bundle_analyzer_service_1 = require("./webpack-webpack-bundle-analyzer.service");
describe('WebpackWebpackBundleAnalyzerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService],
        }).compile();
        service = module.get(webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-bundle-analyzer.service.spec.js.map