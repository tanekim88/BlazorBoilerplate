"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_closure_plugin_service_1 = require("./webpack-closure-plugin.service");
describe('WebpackClosureWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_closure_plugin_service_1.WebpackClosureWebpackPluginService],
        }).compile();
        service = module.get(webpack_closure_plugin_service_1.WebpackClosureWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-closure-plugin.service.spec.js.map