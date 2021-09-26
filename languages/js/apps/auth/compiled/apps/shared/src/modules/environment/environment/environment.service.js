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
exports.EnvironmentService = void 0;
const path_1 = __importDefault(require("path"));
const configs_1 = require("../../../../configs");
const merge_service_1 = require("../../utilities/merge/merge/merge.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const configs_base_1 = require("../../../../configs.base");
const paths_1 = require("@projects/root/paths");
let EnvironmentService = class EnvironmentService {
    onModuleInit() {
        const relPath = path_1.default.relative(paths_1.rootPaths.toAbsolutePath(), this.localConfig.rootDir);
        const splitted = relPath.split(path_1.default.sep);
        this.localPaths = splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, paths_1.rootPaths);
        const RelPath = path_1.default.relative(paths_1.RootPaths.toAbsolutePath(), this.localConfig.RootDir);
        const Splitted = RelPath.split(path_1.default.sep);
        this.LocalPaths = Splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, paths_1.RootPaths);
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
    process_webpack_providers_1.CustomInject(configs_1.LOCAL_CONFIG),
    __metadata("design:type", configs_base_1.ConfigBase)
], EnvironmentService.prototype, "localConfig", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(merge_service_1.MergeService),
    __metadata("design:type", merge_service_1.MergeService)
], EnvironmentService.prototype, "mergeService", void 0);
EnvironmentService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], EnvironmentService);
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment.service.js.map