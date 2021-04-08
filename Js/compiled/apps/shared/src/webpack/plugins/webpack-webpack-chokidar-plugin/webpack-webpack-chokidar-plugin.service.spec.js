"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_webpack_chokidar_plugin_service_1 = require("./webpack-webpack-chokidar-plugin.service");
describe('WebpackWebpackChokidarPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService],
        }).compile();
        service = module.get(webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.spec.js.map