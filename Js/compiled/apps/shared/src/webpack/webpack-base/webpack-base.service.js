var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import webpack from 'webpack';
import { EnvironmentService } from '../../modules/environment/environment/environment.service';
import { MergeService } from '../../modules/utilities/merge/merge/merge.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
let WebpackBaseService = class WebpackBaseService {
    mergeService;
    environmentService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions({}, options);
    }
    excuteWebpack(configs) {
        const compiler = webpack(configs);
        const watching = compiler.watch({
        // Example watchOptions
        // aggregateTimeout: 300,
        // poll: undefined
        }, (err, stats) => {
            console.log(stats.toString({
                colors: true, // Shows colors in the console
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
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], WebpackBaseService.prototype, "mergeService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackBaseService.prototype, "environmentService", void 0);
WebpackBaseService = __decorate([
    CustomInjectable()
], WebpackBaseService);
export { WebpackBaseService };
//# sourceMappingURL=webpack-base.service.js.map