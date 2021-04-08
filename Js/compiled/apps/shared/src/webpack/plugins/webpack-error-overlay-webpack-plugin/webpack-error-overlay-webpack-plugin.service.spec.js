"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_error_overlay_webpack_plugin_service_1 = require("./webpack-error-overlay-webpack-plugin.service");
describe('WebpackErrorOverlayWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService],
        }).compile();
        service = module.get(webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-error-overlay-webpack-plugin.service.spec.js.map