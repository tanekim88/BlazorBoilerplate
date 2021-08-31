var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LOCAL_CONFIG } from '#shared/configs';
import { ConfigBase } from '#shared/configs.base';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { MergeService } from '../../utilities/merge/merge/merge.service';
import path from 'path';
import { rootPaths } from '#root/paths';
let PathService = class PathService {
    localConfig;
    mergeService;
    localPaths;
    outputDir;
    logoPath;
    onModuleInit() {
        this.localPaths = rootPaths[path.basename(this.localConfig.rootDir)];
        this.createEnvironments();
    }
    createEnvironments() {
        this.outputDir = this.localPaths['wwwroot'].toAbsolutePath();
        this.logoPath = this.localPaths.src.logo['icon-512.png'].toAbsolutePath();
    }
};
__decorate([
    CustomInject(LOCAL_CONFIG),
    __metadata("design:type", ConfigBase)
], PathService.prototype, "localConfig", void 0);
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], PathService.prototype, "mergeService", void 0);
PathService = __decorate([
    CustomInjectable()
], PathService);
export { PathService };
//# sourceMappingURL=path.service.js.map