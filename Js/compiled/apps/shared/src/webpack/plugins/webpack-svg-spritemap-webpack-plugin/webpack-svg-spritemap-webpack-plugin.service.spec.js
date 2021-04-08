"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_svg_spritemap_webpack_plugin_service_1 = require("./webpack-svg-spritemap-webpack-plugin.service");
describe('WebpackSvgSpriteMapWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_svg_spritemap_webpack_plugin_service_1.WebpackSvgSpriteMapWebpackPluginService],
        }).compile();
        service = module.get(webpack_svg_spritemap_webpack_plugin_service_1.WebpackSvgSpriteMapWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-spritemap-webpack-plugin.service.spec.js.map