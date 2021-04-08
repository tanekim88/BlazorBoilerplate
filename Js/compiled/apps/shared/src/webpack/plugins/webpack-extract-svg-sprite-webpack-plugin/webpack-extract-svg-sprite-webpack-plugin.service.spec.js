"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_extract_svg_sprite_webpack_plugin_service_1 = require("./webpack-extract-svg-sprite-webpack-plugin.service");
describe('WebpackExtractSvgSpriteWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_extract_svg_sprite_webpack_plugin_service_1.WebpackExtractSvgSpriteWebpackPluginService],
        }).compile();
        service = module.get(webpack_extract_svg_sprite_webpack_plugin_service_1.WebpackExtractSvgSpriteWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.spec.js.map