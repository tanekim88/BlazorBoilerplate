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
exports.PathService = void 0;
const configs_1 = require("@shared/configs");
const configs_base_1 = require("@shared/configs.base");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const merge_service_1 = require("../../utilities/merge/merge/merge.service");
const path_1 = __importDefault(require("path"));
const paths_1 = require("@root/paths");
let PathService = class PathService {
    onModuleInit() {
        this.localPaths = paths_1.rootPaths[path_1.default.basename(this.localConfig.rootDir)];
        this.createEnvironments();
    }
    createEnvironments() {
        this.outputDir = this.localPaths['wwwroot'].toAbsolutePath();
        this.logoPath = this.localPaths.src.logo['icon-512.png'].toAbsolutePath();
    }
};
__decorate([
    process_webpack_providers_1.CustomInject(configs_1.LOCAL_CONFIG),
    __metadata("design:type", configs_base_1.ConfigBase)
], PathService.prototype, "localConfig", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(merge_service_1.MergeService),
    __metadata("design:type", merge_service_1.MergeService)
], PathService.prototype, "mergeService", void 0);
PathService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], PathService);
exports.PathService = PathService;
//# sourceMappingURL=path.service.js.map