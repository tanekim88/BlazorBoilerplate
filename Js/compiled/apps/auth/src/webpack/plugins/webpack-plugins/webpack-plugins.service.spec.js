"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_plugins_service_1 = require("./webpack-plugins.service");
describe('AuthWebpackPluginsConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_plugins_service_1.AuthWebpackPluginsConfigService],
        }).compile();
        service = module.get(webpack_plugins_service_1.AuthWebpackPluginsConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugins.service.spec.js.map