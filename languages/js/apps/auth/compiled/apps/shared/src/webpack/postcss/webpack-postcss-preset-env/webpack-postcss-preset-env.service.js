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
exports.WebpackPostcssPresetEnvService = void 0;
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const webpack_postcss_base_service_1 = require("../webpack-postcss-base/webpack-postcss-base.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
let WebpackPostcssPresetEnvService = class WebpackPostcssPresetEnvService extends webpack_postcss_base_service_1.WebpackPostcssBaseService {
    constructor() {
        super(postcss_preset_env_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            stage: 0,
            autoprefixer: { grid: false },
        }, options);
    }
};
WebpackPostcssPresetEnvService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackPostcssPresetEnvService);
exports.WebpackPostcssPresetEnvService = WebpackPostcssPresetEnvService;
//# sourceMappingURL=webpack-postcss-preset-env.service.js.map