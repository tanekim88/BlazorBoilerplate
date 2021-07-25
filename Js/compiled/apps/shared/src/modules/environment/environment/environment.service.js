var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import path from 'path';
import { LOCAL_CONFIG } from '../../../../configs';
import { MergeService } from '../../utilities/merge/merge/merge.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { ConfigBase } from '../../../../configs.base';
import { RootPaths, rootPaths } from '@root/paths';
let EnvironmentService = class EnvironmentService {
    onModuleInit() {
        const relPath = path.relative(rootPaths.toAbsolutePath(), this.localConfig.rootDir);
        const splitted = relPath.split(path.sep);
        this.localPaths = splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, rootPaths);
        const RelPath = path.relative(RootPaths.toAbsolutePath(), this.localConfig.RootDir);
        const Splitted = RelPath.split(path.sep);
        this.LocalPaths = Splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, RootPaths);
        this.createEnvironments();
    }
    createEnvironments() {
        this.isProduction = process.env.NODE_ENV === 'production';
        this.isDevelopment = process.env.NODE_ENV === 'development';
        if (this.LocalPaths['wwwroot']) {
            this.outputDir = this.LocalPaths['wwwroot'].toAbsolutePath();
        }
        this.logoPath = this.localPaths.src.logo['icon-512.png'].toAbsolutePath();
    }
};
__decorate([
    CustomInject(LOCAL_CONFIG),
    __metadata("design:type", ConfigBase)
], EnvironmentService.prototype, "localConfig", void 0);
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], EnvironmentService.prototype, "mergeService", void 0);
EnvironmentService = __decorate([
    CustomInjectable()
], EnvironmentService);
export { EnvironmentService };
//# sourceMappingURL=environment.service.js.map