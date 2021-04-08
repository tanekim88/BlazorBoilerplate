"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_terser_plugin_service_1 = require("./webpack-terser-plugin.service");
describe('WebpackTerserPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_terser_plugin_service_1.WebpackTerserPluginService],
        }).compile();
        service = module.get(webpack_terser_plugin_service_1.WebpackTerserPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-terser-plugin.service.spec.js.map