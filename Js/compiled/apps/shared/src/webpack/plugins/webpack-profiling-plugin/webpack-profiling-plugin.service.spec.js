"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_profiling_plugin_service_1 = require("./webpack-profiling-plugin.service");
describe('WebpackProfilingPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_profiling_plugin_service_1.WebpackProfilingPluginService],
        }).compile();
        service = module.get(webpack_profiling_plugin_service_1.WebpackProfilingPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-profiling-plugin.service.spec.js.map