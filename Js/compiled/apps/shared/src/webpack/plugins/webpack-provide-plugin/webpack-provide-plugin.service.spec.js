"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_provide_plugin_service_1 = require("./webpack-provide-plugin.service");
describe('WebpackProvidePluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_provide_plugin_service_1.WebpackProvidePluginService],
        }).compile();
        service = module.get(webpack_provide_plugin_service_1.WebpackProvidePluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-provide-plugin.service.spec.js.map