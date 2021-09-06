var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { WebpackCssnanoService } from '../webpack-cssnano/webpack-cssnano.service';
import { WebpackPostcssFontMagicianService } from '../webpack-postcss-font-magician/webpack-postcss-font-magician.service';
import { WebpackPostcssFunctionsService } from '../webpack-postcss-functions/webpack-postcss-functions.service';
import { WebpackPostcssPresetEnvService } from '../webpack-postcss-preset-env/webpack-postcss-preset-env.service';
import { WebpackPostcssReporterService } from '../webpack-postcss-reporter/webpack-postcss-reporter.service';
import { WebpackPostcssRfsAutopilotService } from '../webpack-postcss-rfs-autopilot/webpack-postcss-rfs-autopilot.service';
import { WebpackRfsService } from '../webpack-rfs/webpack-rfs.service';
import { WebpackTailwindcssService } from '../webpack-tailwindcss/webpack-tailwindcss.service';
// Sealed class.
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { WebpackPostcssPurgecssService } from '../webpack-postcss-purgecss/webpack-postcss-purgecss.service';
import { WebpackPostcssCombineDuplicatedSelectorsService } from '../webpack-postcss-combine-duplicated-selectors/webpack-postcss-combine-duplicated-selectors.service';
let WebpackPostcssService = class WebpackPostcssService {
    webpackCssNanoService;
    webpackPostcssReporterService;
    environmentService;
    webpackPostcssPurgecssService;
    webpackPostcssPresetEnvService;
    webpackPostcssCombineDuplicatedSelectorsService;
    webpackPostcssFunctionsService;
    webpackPostcssFontMagicianService;
    webpackTailwindcssService;
    webpackPostcssRfsAutopilotService;
    webpackRfsService;
    createPostcssPlugins() {
        const plugins = [];
        plugins.push(this.webpackPostcssRfsAutopilotService.createPlugin());
        plugins.push(this.webpackRfsService.createPlugin());
        plugins.push(this.webpackTailwindcssService.createPlugin());
        // plugins.push(this.webpackPostcssFunctionsService.createPlugin());
        // plugins.push(this.webpackPostcssFontMagicianService.createPlugin());
        // plugins.push(this.webpackPostcssPresetEnvService.createPlugin());
        // if (this.environmentService.isDevelopment) {
        //     postcssPluginsAfter.push(this.webpackPostcssCombineDuplicatedSelectorsService.createPlugin());
        // }
        if (this.environmentService.isProduction) {
            plugins.push(this.webpackPostcssPurgecssService.createPlugin());
            plugins.push(this.webpackCssNanoService.createPlugin());
        }
        // plugins.push(this.webpackPostcssReporterService.createPlugin());
        return plugins;
    }
};
__decorate([
    CustomInject(WebpackCssnanoService),
    __metadata("design:type", typeof (_a = typeof WebpackCssnanoService !== "undefined" && WebpackCssnanoService) === "function" ? _a : Object)
], WebpackPostcssService.prototype, "webpackCssNanoService", void 0);
__decorate([
    CustomInject(WebpackPostcssReporterService),
    __metadata("design:type", typeof (_b = typeof WebpackPostcssReporterService !== "undefined" && WebpackPostcssReporterService) === "function" ? _b : Object)
], WebpackPostcssService.prototype, "webpackPostcssReporterService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackPostcssService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(WebpackPostcssPurgecssService),
    __metadata("design:type", typeof (_c = typeof WebpackPostcssPurgecssService !== "undefined" && WebpackPostcssPurgecssService) === "function" ? _c : Object)
], WebpackPostcssService.prototype, "webpackPostcssPurgecssService", void 0);
__decorate([
    CustomInject(WebpackPostcssPresetEnvService),
    __metadata("design:type", typeof (_d = typeof WebpackPostcssPresetEnvService !== "undefined" && WebpackPostcssPresetEnvService) === "function" ? _d : Object)
], WebpackPostcssService.prototype, "webpackPostcssPresetEnvService", void 0);
__decorate([
    CustomInject(WebpackPostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", typeof (_e = typeof WebpackPostcssCombineDuplicatedSelectorsService !== "undefined" && WebpackPostcssCombineDuplicatedSelectorsService) === "function" ? _e : Object)
], WebpackPostcssService.prototype, "webpackPostcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    CustomInject(WebpackPostcssFunctionsService),
    __metadata("design:type", typeof (_f = typeof WebpackPostcssFunctionsService !== "undefined" && WebpackPostcssFunctionsService) === "function" ? _f : Object)
], WebpackPostcssService.prototype, "webpackPostcssFunctionsService", void 0);
__decorate([
    CustomInject(WebpackPostcssFontMagicianService),
    __metadata("design:type", typeof (_g = typeof WebpackPostcssFontMagicianService !== "undefined" && WebpackPostcssFontMagicianService) === "function" ? _g : Object)
], WebpackPostcssService.prototype, "webpackPostcssFontMagicianService", void 0);
__decorate([
    CustomInject(WebpackTailwindcssService),
    __metadata("design:type", typeof (_h = typeof WebpackTailwindcssService !== "undefined" && WebpackTailwindcssService) === "function" ? _h : Object)
], WebpackPostcssService.prototype, "webpackTailwindcssService", void 0);
__decorate([
    CustomInject(WebpackPostcssRfsAutopilotService),
    __metadata("design:type", typeof (_j = typeof WebpackPostcssRfsAutopilotService !== "undefined" && WebpackPostcssRfsAutopilotService) === "function" ? _j : Object)
], WebpackPostcssService.prototype, "webpackPostcssRfsAutopilotService", void 0);
__decorate([
    CustomInject(WebpackRfsService),
    __metadata("design:type", typeof (_k = typeof WebpackRfsService !== "undefined" && WebpackRfsService) === "function" ? _k : Object)
], WebpackPostcssService.prototype, "webpackRfsService", void 0);
WebpackPostcssService = __decorate([
    CustomInjectable()
], WebpackPostcssService);
export { WebpackPostcssService };
//# sourceMappingURL=postcss.service.js.map