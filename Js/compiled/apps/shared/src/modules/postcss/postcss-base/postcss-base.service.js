var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MergeService } from '../../utilities/modules/merge/merge/merge.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '#shared/src/modules/environment/environment/environment.service';
let PostcssBaseService = class PostcssBaseService {
    ConstructorClass;
    mergeService;
    environmentService;
    constructor(ConstructorClass) {
        this.ConstructorClass = ConstructorClass;
    }
    createOptions(options) {
        return this.mergeService.mergeOptions({}, options);
    }
    createPlugin(options) {
        return this.ConstructorClass(this.createOptions(options));
    }
};
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], PostcssBaseService.prototype, "mergeService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], PostcssBaseService.prototype, "environmentService", void 0);
PostcssBaseService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [Object])
], PostcssBaseService);
export { PostcssBaseService };
//# sourceMappingURL=postcss-base.service.js.map