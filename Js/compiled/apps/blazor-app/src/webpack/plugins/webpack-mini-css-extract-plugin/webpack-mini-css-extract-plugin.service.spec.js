"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_mini_css_extract_plugin_service_1 = require("./webpack-mini-css-extract-plugin.service");
describe('BlazorAppWebpackMiniCssExtractPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_mini_css_extract_plugin_service_1.BlazorAppWebpackMiniCssExtractPluginConfigService],
        }).compile();
        service = module.get(webpack_mini_css_extract_plugin_service_1.BlazorAppWebpackMiniCssExtractPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.spec.js.map