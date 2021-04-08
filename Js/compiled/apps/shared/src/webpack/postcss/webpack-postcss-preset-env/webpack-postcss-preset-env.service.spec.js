"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_preset_env_service_1 = require("./webpack-postcss-preset-env.service");
describe('WebpackPostcssPresetEnvService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_preset_env_service_1.WebpackPostcssPresetEnvService],
        }).compile();
        service = module.get(webpack_postcss_preset_env_service_1.WebpackPostcssPresetEnvService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-preset-env.service.spec.js.map