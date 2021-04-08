"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_favicons_webpack_plugin_service_1 = require("./webpack-favicons-webpack-plugin.service");
describe('BlazorAppWebpackFaviconsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_favicons_webpack_plugin_service_1.BlazorAppWebpackFaviconsWebpackPluginService],
        }).compile();
        service = module.get(webpack_favicons_webpack_plugin_service_1.BlazorAppWebpackFaviconsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.spec.js.map