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
exports.WebpackRfsService = void 0;
const webpack_postcss_base_service_1 = require("../webpack-postcss-base/webpack-postcss-base.service");
const rfs_1 = __importDefault(require("rfs"));
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
let WebpackRfsService = class WebpackRfsService extends webpack_postcss_base_service_1.WebpackPostcssBaseService {
    constructor() {
        super(rfs_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackRfsService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackRfsService);
exports.WebpackRfsService = WebpackRfsService;
//# sourceMappingURL=webpack-rfs.service.js.map