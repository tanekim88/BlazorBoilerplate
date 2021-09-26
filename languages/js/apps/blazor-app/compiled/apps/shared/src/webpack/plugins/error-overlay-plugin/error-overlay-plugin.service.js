var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Optional } from '@nestjs/common';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
let WebpackErrorOverlayWebpackPluginService = class WebpackErrorOverlayWebpackPluginService extends WebpackPluginBaseService {
    constructor(classConstructor) {
        super(classConstructor ?? ErrorOverlayPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackErrorOverlayWebpackPluginService = __decorate([
    CustomInjectable(),
    __param(0, Optional()),
    __metadata("design:paramtypes", [Object])
], WebpackErrorOverlayWebpackPluginService);
export { WebpackErrorOverlayWebpackPluginService };
//# sourceMappingURL=error-overlay-plugin.service.js.map