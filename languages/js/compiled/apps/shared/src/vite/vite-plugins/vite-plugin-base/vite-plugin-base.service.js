var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/modules/merge/merge/merge.service';
import _ from 'lodash';
let VitePluginBaseService = class VitePluginBaseService {
    mergeService;
    environmentService;
    createOptions(options) {
        return this.mergeService.mergeOptions({}, options);
    }
    createPrePlugin(...options) {
        return {};
    }
    createPlugin(...options) {
        return {};
    }
    createPostPlugin(...options) {
        return {};
    }
    createManyPlugins(...options) {
        return [
            this.createPrePlugin(...options),
            this.createPlugin(...options),
            this.createPostPlugin(...options)
        ].filter(plugin => {
            return !_.isEmpty(plugin);
        });
    }
};
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], VitePluginBaseService.prototype, "mergeService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], VitePluginBaseService.prototype, "environmentService", void 0);
VitePluginBaseService = __decorate([
    CustomInjectable()
], VitePluginBaseService);
export { VitePluginBaseService };
//# sourceMappingURL=vite-plugin-base.service.js.map