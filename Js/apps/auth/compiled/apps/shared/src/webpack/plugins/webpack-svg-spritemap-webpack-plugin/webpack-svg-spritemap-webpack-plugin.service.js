"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackSvgSpriteMapWebpackPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const svg_spritemap_webpack_plugin_1 = __importDefault(require("svg-spritemap-webpack-plugin"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const paths_1 = require("@shared/paths");
const path_1 = __importDefault(require("path"));
let WebpackSvgSpriteMapWebpackPluginService = class WebpackSvgSpriteMapWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(svg_spritemap_webpack_plugin_1.default);
    }
    createManyOptions(options1, options2) {
        const optionsOverride = [
            [path_1.default.resolve(paths_1.sharedPaths.node_modules.toAbsolutePath(), '@icon/open-iconic/icons/*.svg')],
            {
                output: {
                    filename: 'open-iconic-icons.svg',
                },
                sprite: {
                    prefix: 'oi oi-',
                },
            },
        ];
        const options = [options1, options2];
        return super
            .createManyOptions([], {})
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, optionsOverride[i]);
        })
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, options[i]);
        });
    }
};
WebpackSvgSpriteMapWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackSvgSpriteMapWebpackPluginService);
exports.WebpackSvgSpriteMapWebpackPluginService = WebpackSvgSpriteMapWebpackPluginService;
//# sourceMappingURL=webpack-svg-spritemap-webpack-plugin.service.js.map