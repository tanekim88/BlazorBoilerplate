"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_copy_webpack_plugin_service_1 = require("./webpack-copy-webpack-plugin.service");
describe('AuthWebpackCopyWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_copy_webpack_plugin_service_1.AuthWebpackCopyWebpackPluginService],
        }).compile();
        service = module.get(webpack_copy_webpack_plugin_service_1.AuthWebpackCopyWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-copy-webpack-plugin.service.spec.js.map