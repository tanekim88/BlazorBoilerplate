var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable, CustomInject } from "#shared/src/functions/process-providers";
import { EnvironmentService } from "#shared/src/modules/environment/environment/environment.service";
import { PostcssCombineDuplicatedSelectorsService } from "#shared/src/modules/postcss/services/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service";
import { CssnanoService } from "#shared/src/modules/postcss/services/cssnano/cssnano.service";
import { PostcssFontMagicianService } from "#shared/src/modules/postcss/services/postcss-font-magician/postcss-font-magician.service";
import { PostcssFunctionsService } from "#shared/src/modules/postcss/services/postcss-functions/postcss-functions.service";
import { PostcssPresetEnvService } from "#shared/src/modules/postcss/services/postcss-preset-env/postcss-preset-env.service";
import { PostcssPurgecssService } from "#shared/src/modules/postcss/services/postcss-purgecss/postcss-purgecss.service";
import { PostcssReporterService } from "#shared/src/modules/postcss/services/postcss-reporter/postcss-reporter.service";
import { PostcssRfsAutopilotService } from "#shared/src/modules/postcss/services/postcss-rfs-autopilot/postcss-rfs-autopilot.service";
import { RfsService } from "#shared/src/modules/postcss/services/rfs/rfs.service";
let SolidAppPostcssService = class SolidAppPostcssService {
    CssNanoService;
    postcssReporterService;
    environmentService;
    postcssPurgecssService;
    postcssPresetEnvService;
    postcssCombineDuplicatedSelectorsService;
    postcssFunctionsService;
    postcssFontMagicianService;
    // @CustomInject(TailwindcssService)
    // protected TailwindcssService: TailwindcssService;
    postcssRfsAutopilotService;
    RfsService;
    createPostcssPlugins() {
        const plugins = [];
        plugins.push(this.postcssRfsAutopilotService.createPlugin());
        plugins.push(this.RfsService.createPlugin());
        // plugins.push(this.TailwindcssService.createPlugin());
        // plugins.push(this.postcssFunctionsService.createPlugin());
        // plugins.push(this.postcssFontMagicianService.createPlugin());
        // plugins.push(this.postcssPresetEnvService.createPlugin());
        // if (this.environmentService.isDevelopment) {
        //     postcssPluginsAfter.push(this.postcssCombineDuplicatedSelectorsService.createPlugin());
        // }
        if (this.environmentService.isProduction) {
            plugins.push(this.postcssPurgecssService.createPlugin());
            plugins.push(this.CssNanoService.createPlugin());
        }
        // plugins.push(this.postcssReporterService.createPlugin());
        return plugins;
    }
};
__decorate([
    CustomInject(CssnanoService),
    __metadata("design:type", CssnanoService)
], SolidAppPostcssService.prototype, "CssNanoService", void 0);
__decorate([
    CustomInject(PostcssReporterService),
    __metadata("design:type", PostcssReporterService)
], SolidAppPostcssService.prototype, "postcssReporterService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], SolidAppPostcssService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(PostcssPurgecssService),
    __metadata("design:type", PostcssPurgecssService)
], SolidAppPostcssService.prototype, "postcssPurgecssService", void 0);
__decorate([
    CustomInject(PostcssPresetEnvService),
    __metadata("design:type", PostcssPresetEnvService)
], SolidAppPostcssService.prototype, "postcssPresetEnvService", void 0);
__decorate([
    CustomInject(PostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", PostcssCombineDuplicatedSelectorsService)
], SolidAppPostcssService.prototype, "postcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    CustomInject(PostcssFunctionsService),
    __metadata("design:type", PostcssFunctionsService)
], SolidAppPostcssService.prototype, "postcssFunctionsService", void 0);
__decorate([
    CustomInject(PostcssFontMagicianService),
    __metadata("design:type", PostcssFontMagicianService)
], SolidAppPostcssService.prototype, "postcssFontMagicianService", void 0);
__decorate([
    CustomInject(PostcssRfsAutopilotService),
    __metadata("design:type", PostcssRfsAutopilotService)
], SolidAppPostcssService.prototype, "postcssRfsAutopilotService", void 0);
__decorate([
    CustomInject(RfsService),
    __metadata("design:type", RfsService)
], SolidAppPostcssService.prototype, "RfsService", void 0);
SolidAppPostcssService = __decorate([
    CustomInjectable()
], SolidAppPostcssService);
export { SolidAppPostcssService };
//# sourceMappingURL=postcss.service.js.map