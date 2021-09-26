"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_clean_webpack_plugin_service_1 = require("./webpack-clean-webpack-plugin.service");
describe('AuthWebpackCleanWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_clean_webpack_plugin_service_1.AuthWebpackCleanWebpackPluginService],
        }).compile();
        service = module.get(webpack_clean_webpack_plugin_service_1.AuthWebpackCleanWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-clean-webpack-plugin.service.spec.js.map