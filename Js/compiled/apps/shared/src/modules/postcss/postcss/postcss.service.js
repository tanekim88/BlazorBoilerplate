var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { CssnanoService } from '../services/cssnano/cssnano.service';
import { PostcssFontMagicianService } from '../services/postcss-font-magician/postcss-font-magician.service';
import { PostcssFunctionsService } from '../services/postcss-functions/postcss-functions.service';
import { PostcssPresetEnvService } from '../services/postcss-preset-env/postcss-preset-env.service';
import { PostcssReporterService } from '../services/postcss-reporter/postcss-reporter.service';
import { PostcssRfsAutopilotService } from '../services/postcss-rfs-autopilot/postcss-rfs-autopilot.service';
import { RfsService } from '../services/rfs/rfs.service';
// import { TailwindcssService } from '../services/tailwindcss/tailwindcss.service';
// Sealed class.
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { PostcssPurgecssService } from '../services/postcss-purgecss/postcss-purgecss.service';
import { PostcssCombineDuplicatedSelectorsService } from '../services/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service';
let PostcssService = class PostcssService {
    CssNanoService;
    PostcssReporterService;
    environmentService;
    PostcssPurgecssService;
    PostcssPresetEnvService;
    PostcssCombineDuplicatedSelectorsService;
    PostcssFunctionsService;
    PostcssFontMagicianService;
    // @CustomInject(TailwindcssService)
    // protected TailwindcssService: TailwindcssService;
    PostcssRfsAutopilotService;
    RfsService;
    createPostcssPlugins() {
        const plugins = [];
        plugins.push(this.PostcssRfsAutopilotService.createPlugin());
        plugins.push(this.RfsService.createPlugin());
        // plugins.push(this.TailwindcssService.createPlugin());
        // plugins.push(this.PostcssFunctionsService.createPlugin());
        // plugins.push(this.PostcssFontMagicianService.createPlugin());
        // plugins.push(this.PostcssPresetEnvService.createPlugin());
        // if (this.environmentService.isDevelopment) {
        //     postcssPluginsAfter.push(this.PostcssCombineDuplicatedSelectorsService.createPlugin());
        // }
        if (this.environmentService.isProduction) {
            plugins.push(this.PostcssPurgecssService.createPlugin());
            plugins.push(this.CssNanoService.createPlugin());
        }
        // plugins.push(this.PostcssReporterService.createPlugin());
        return plugins;
    }
};
__decorate([
    CustomInject(CssnanoService),
    __metadata("design:type", CssnanoService)
], PostcssService.prototype, "CssNanoService", void 0);
__decorate([
    CustomInject(PostcssReporterService),
    __metadata("design:type", PostcssReporterService)
], PostcssService.prototype, "PostcssReporterService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], PostcssService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(PostcssPurgecssService),
    __metadata("design:type", PostcssPurgecssService)
], PostcssService.prototype, "PostcssPurgecssService", void 0);
__decorate([
    CustomInject(PostcssPresetEnvService),
    __metadata("design:type", PostcssPresetEnvService)
], PostcssService.prototype, "PostcssPresetEnvService", void 0);
__decorate([
    CustomInject(PostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", PostcssCombineDuplicatedSelectorsService)
], PostcssService.prototype, "PostcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    CustomInject(PostcssFunctionsService),
    __metadata("design:type", PostcssFunctionsService)
], PostcssService.prototype, "PostcssFunctionsService", void 0);
__decorate([
    CustomInject(PostcssFontMagicianService),
    __metadata("design:type", PostcssFontMagicianService)
], PostcssService.prototype, "PostcssFontMagicianService", void 0);
__decorate([
    CustomInject(PostcssRfsAutopilotService),
    __metadata("design:type", PostcssRfsAutopilotService)
], PostcssService.prototype, "PostcssRfsAutopilotService", void 0);
__decorate([
    CustomInject(RfsService),
    __metadata("design:type", RfsService)
], PostcssService.prototype, "RfsService", void 0);
PostcssService = __decorate([
    CustomInjectable()
], PostcssService);
export { PostcssService };
//# sourceMappingURL=postcss.service.js.map