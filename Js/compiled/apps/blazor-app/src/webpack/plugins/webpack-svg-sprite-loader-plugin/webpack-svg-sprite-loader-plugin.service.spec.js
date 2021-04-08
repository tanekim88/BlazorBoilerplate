"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_svg_sprite_loader_plugin_service_1 = require("./webpack-svg-sprite-loader-plugin.service");
describe('BlazorAppWebpackSvgSpriteLoaderPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_svg_sprite_loader_plugin_service_1.BlazorAppWebpackSvgSpriteLoaderPluginService],
        }).compile();
        service = module.get(webpack_svg_sprite_loader_plugin_service_1.BlazorAppWebpackSvgSpriteLoaderPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-svg-sprite-loader-plugin.service.spec.js.map