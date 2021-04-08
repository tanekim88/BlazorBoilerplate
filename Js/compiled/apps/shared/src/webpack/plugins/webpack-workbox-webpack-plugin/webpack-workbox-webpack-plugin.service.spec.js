"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_workbox_webpack_plugin_service_1 = require("./webpack-workbox-webpack-plugin.service");
describe('WebpackWorkboxWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService],
        }).compile();
        service = module.get(webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.spec.js.map