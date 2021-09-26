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
exports.WebpackPostcssFontMagicianService = void 0;
const webpack_postcss_base_service_1 = require("../webpack-postcss-base/webpack-postcss-base.service");
const postcss_font_magician_1 = __importDefault(require("postcss-font-magician"));
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
let WebpackPostcssFontMagicianService = class WebpackPostcssFontMagicianService extends webpack_postcss_base_service_1.WebpackPostcssBaseService {
    constructor() {
        super(postcss_font_magician_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            //protocol: 'https:',
            //formats: 'woff2 woff', // By default, local, woff2, woff, and eot are enabled. Supported formats include local, woff2, woff, ttf, eot, svg, and otf.
            //async: 'path/to/your-fonts-async-loader.js',
            //hosted: ['./src/fonts', /custom/path / to / fonts / on / site],
            //display: 'swap',
            //foundries: 'bootstrap google',
            aliases: {
                'sans-serif': 'Sans Serif',
            },
            variants: {
                'Open Sans': {
                    '300': ['woff, eot, woff2'],
                    '300 italic': ['woff2'],
                    '400': [],
                    '400 italic': [],
                    '600': [],
                    '600 italic': [],
                    '700': [],
                    '700 italic': [],
                },
            },
            foundries: ['google'],
        }, options);
    }
};
WebpackPostcssFontMagicianService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackPostcssFontMagicianService);
exports.WebpackPostcssFontMagicianService = WebpackPostcssFontMagicianService;
//# sourceMappingURL=webpack-postcss-font-magician.service.js.map