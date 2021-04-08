"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_optimize_css_assets_plugin_service_1 = require("./webpack-optimize-css-assets-plugin.service");
describe('WebpackOptimizeCssAssetsPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_optimize_css_assets_plugin_service_1.WebpackOptimizeCssAssetsPluginService],
        }).compile();
        service = module.get(webpack_optimize_css_assets_plugin_service_1.WebpackOptimizeCssAssetsPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-optimize-css-assets-plugin.service.spec.js.map