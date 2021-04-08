"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_css_minimizer_plugin_service_1 = require("./webpack-css-minimizer-plugin.service");
describe('WebpackCssMinimizerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_css_minimizer_plugin_service_1.WebpackCssMinimizerPluginService],
        }).compile();
        service = module.get(webpack_css_minimizer_plugin_service_1.WebpackCssMinimizerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-css-minimizer-plugin.service.spec.js.map