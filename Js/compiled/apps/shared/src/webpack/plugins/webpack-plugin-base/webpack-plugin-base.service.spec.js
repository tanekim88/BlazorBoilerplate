"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_plugin_base_service_1 = require("./webpack-plugin-base.service");
describe('WebpackPluginBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_plugin_base_service_1.WebpackPluginBaseService],
        }).compile();
        service = module.get(webpack_plugin_base_service_1.WebpackPluginBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugin-base.service.spec.js.map