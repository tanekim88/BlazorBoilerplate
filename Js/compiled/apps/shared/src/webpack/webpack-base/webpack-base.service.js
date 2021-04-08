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
exports.WebpackBaseService = void 0;
const webpack_1 = __importDefault(require("webpack"));
const environment_service_1 = require("../../modules/environment/environment/environment.service");
const merge_service_1 = require("../../modules/utilities/merge/merge/merge.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
let WebpackBaseService = class WebpackBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions({}, options);
    }
    excuteWebpack(configs) {
        const compiler = webpack_1.default(configs);
        const watching = compiler.watch({
        // Example watchOptions
        // aggregateTimeout: 300,
        // poll: undefined
        }, (err, stats) => {
            console.log(stats.toString({
                colors: true,
            }));
        });
        // compiler.compilers[0].hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
        //     params['MyPlugin - data'] = 'important stuff my plugin will use later';
        //     callback();
        //   });
        // watching.invalidate();
        watching.close(() => {
            console.log('Watching Ended.');
        });
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(merge_service_1.MergeService),
    __metadata("design:type", merge_service_1.MergeService)
], WebpackBaseService.prototype, "mergeService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackBaseService.prototype, "environmentService", void 0);
WebpackBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackBaseService);
exports.WebpackBaseService = WebpackBaseService;
//# sourceMappingURL=webpack-base.service.js.map