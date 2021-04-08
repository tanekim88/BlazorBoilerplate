"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("./webpack-tsconfig-paths-webpack-plugin.service");
describe('WebpackTsconfigPathsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService],
        }).compile();
        service = module.get(webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.spec.js.map