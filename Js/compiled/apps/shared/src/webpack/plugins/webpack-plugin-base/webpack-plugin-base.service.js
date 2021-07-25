var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/merge/merge/merge.service';
let WebpackPluginBaseService = class WebpackPluginBaseService {
    constructor(ConstructorClass) {
        this.ConstructorClass = ConstructorClass;
    }
    createOptions(options) {
        if (Array.isArray(options)) {
            return this.mergeService.mergeOptions([], options);
        }
        return this.mergeService.mergeOptions({}, options);
    }
    createManyOptions(...options) {
        if (options.length === 0) {
            options = [{}];
        }
        return options.map((option) => {
            return this.createOptions(option);
        });
    }
    createPlugin(...options) {
        return new this.ConstructorClass(...this.createManyOptions(...options));
    }
    createManyPlugins(...manyManyOptions) {
        return manyManyOptions.map((manyOptions) => {
            if (!Array.isArray(manyOptions)) {
                manyOptions = [manyOptions];
            }
            return this.createPlugin(...manyOptions);
        });
    }
};
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], WebpackPluginBaseService.prototype, "mergeService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackPluginBaseService.prototype, "environmentService", void 0);
WebpackPluginBaseService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [Object])
], WebpackPluginBaseService);
export { WebpackPluginBaseService };
//# sourceMappingURL=webpack-plugin-base.service.js.map