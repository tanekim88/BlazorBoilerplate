var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import PostcssImport from 'postcss-import';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let PostcssImportService = class PostcssImportService extends PostcssBaseService {
    constructor() {
        super(PostcssImport);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
        // addModulesDirectories: [this.environmentService.environments.localEnvironment.absolutePaths.nodeModules_],
        // resolve: (id, base, Options) => {
        //   return postcssImportResolve(id, base, Options);
        // }
        }, options);
    }
};
PostcssImportService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], PostcssImportService);
export { PostcssImportService };
//# sourceMappingURL=postcss-import.service.js.map