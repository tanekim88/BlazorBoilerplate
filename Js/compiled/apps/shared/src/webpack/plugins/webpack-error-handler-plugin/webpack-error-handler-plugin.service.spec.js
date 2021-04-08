"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_error_handler_plugin_service_1 = require("./webpack-error-handler-plugin.service");
describe('WebpackErrorHandlerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_error_handler_plugin_service_1.WebpackErrorHandlerPluginService],
        }).compile();
        service = module.get(webpack_error_handler_plugin_service_1.WebpackErrorHandlerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-error-handler-plugin.service.spec.js.map