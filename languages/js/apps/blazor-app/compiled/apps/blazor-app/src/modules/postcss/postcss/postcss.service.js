var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable, CustomInject } from "@projects/shared/src/functions/process-providers";
import { EnvironmentService } from "@projects/shared/src/modules/environment/environment/environment.service";
import { CssnanoService } from "@projects/shared/src/modules/postcss/cssnano/cssnano.service";
import { PostcssCombineDuplicatedSelectorsService } from "@projects/shared/src/modules/postcss/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service";
import { PostcssFontMagicianService } from "@projects/shared/src/modules/postcss/postcss-font-magician/postcss-font-magician.service";
import { PostcssFunctionsService } from "@projects/shared/src/modules/postcss/postcss-functions/postcss-functions.service";
import { PostcssPresetEnvService } from "@projects/shared/src/modules/postcss/postcss-preset-env/postcss-preset-env.service";
import { PostcssPurgecssService } from "@projects/shared/src/modules/postcss/postcss-purgecss/postcss-purgecss.service";
import { PostcssReporterService } from "@projects/shared/src/modules/postcss/postcss-reporter/postcss-reporter.service";
import { PostcssRfsAutopilotService } from "@projects/shared/src/modules/postcss/postcss-rfs-autopilot/postcss-rfs-autopilot.service";
import { RfsService } from "@projects/shared/src/modules/postcss/rfs/rfs.service";
import { TailwindcssService } from "@projects/shared/src/modules/postcss/tailwindcss/tailwindcss.service";
let BlazorAppPostcssService = class BlazorAppPostcssService {
    CssNanoService;
    PostcssReporterService;
    environmentService;
    PostcssPurgecssService;
    PostcssPresetEnvService;
    PostcssCombineDuplicatedSelectorsService;
    PostcssFunctionsService;
    PostcssFontMagicianService;
    TailwindcssService;
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
], BlazorAppPostcssService.prototype, "CssNanoService", void 0);
__decorate([
    CustomInject(PostcssReporterService),
    __metadata("design:type", PostcssReporterService)
], BlazorAppPostcssService.prototype, "PostcssReporterService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], BlazorAppPostcssService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(PostcssPurgecssService),
    __metadata("design:type", PostcssPurgecssService)
], BlazorAppPostcssService.prototype, "PostcssPurgecssService", void 0);
__decorate([
    CustomInject(PostcssPresetEnvService),
    __metadata("design:type", PostcssPresetEnvService)
], BlazorAppPostcssService.prototype, "PostcssPresetEnvService", void 0);
__decorate([
    CustomInject(PostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", PostcssCombineDuplicatedSelectorsService)
], BlazorAppPostcssService.prototype, "PostcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    CustomInject(PostcssFunctionsService),
    __metadata("design:type", PostcssFunctionsService)
], BlazorAppPostcssService.prototype, "PostcssFunctionsService", void 0);
__decorate([
    CustomInject(PostcssFontMagicianService),
    __metadata("design:type", PostcssFontMagicianService)
], BlazorAppPostcssService.prototype, "PostcssFontMagicianService", void 0);
__decorate([
    CustomInject(TailwindcssService),
    __metadata("design:type", TailwindcssService)
], BlazorAppPostcssService.prototype, "TailwindcssService", void 0);
__decorate([
    CustomInject(PostcssRfsAutopilotService),
    __metadata("design:type", PostcssRfsAutopilotService)
], BlazorAppPostcssService.prototype, "PostcssRfsAutopilotService", void 0);
__decorate([
    CustomInject(RfsService),
    __metadata("design:type", RfsService)
], BlazorAppPostcssService.prototype, "RfsService", void 0);
BlazorAppPostcssService = __decorate([
    CustomInjectable()
], BlazorAppPostcssService);
export { BlazorAppPostcssService };
//# sourceMappingURL=postcss.service.js.map