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
import { WebpackCssnanoService } from '../webpack-cssnano/webpack-cssnano.service';
import { WebpackPostcssFontMagicianService } from '../webpack-postcss-font-magician/webpack-postcss-font-magician.service';
import { WebpackPostcssFunctionsService } from '../webpack-postcss-functions/webpack-postcss-functions.service';
import { WebpackPostcssPresetEnvService } from '../webpack-postcss-preset-env/webpack-postcss-preset-env.service';
import { WebpackPostcssReporterService } from '../webpack-postcss-reporter/webpack-postcss-reporter.service';
import { WebpackPostcssRfsAutopilotService } from '../webpack-postcss-rfs-autopilot/webpack-postcss-rfs-autopilot.service';
import { WebpackRfsService } from '../webpack-rfs/webpack-rfs.service';
import { WebpackTailwindcssService } from '../webpack-tailwindcss/webpack-tailwindcss.service';
// Sealed class.
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import { WebpackPostcssPurgecssService } from '../webpack-postcss-purgecss/webpack-postcss-purgecss.service';
import { WebpackPostcssCombineDuplicatedSelectorsService } from '../webpack-postcss-combine-duplicated-selectors/webpack-postcss-combine-duplicated-selectors.service';
let WebpackPostcssService = class WebpackPostcssService {
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
    __metadata("design:type", WebpackCssnanoService)
], WebpackPostcssService.prototype, "webpackCssNanoService", void 0);
__decorate([
    CustomInject(WebpackPostcssReporterService),
    __metadata("design:type", WebpackPostcssReporterService)
], WebpackPostcssService.prototype, "webpackPostcssReporterService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackPostcssService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(WebpackPostcssPurgecssService),
    __metadata("design:type", WebpackPostcssPurgecssService)
], WebpackPostcssService.prototype, "webpackPostcssPurgecssService", void 0);
__decorate([
    CustomInject(WebpackPostcssPresetEnvService),
    __metadata("design:type", WebpackPostcssPresetEnvService)
], WebpackPostcssService.prototype, "webpackPostcssPresetEnvService", void 0);
__decorate([
    CustomInject(WebpackPostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", WebpackPostcssCombineDuplicatedSelectorsService)
], WebpackPostcssService.prototype, "webpackPostcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    CustomInject(WebpackPostcssFunctionsService),
    __metadata("design:type", WebpackPostcssFunctionsService)
], WebpackPostcssService.prototype, "webpackPostcssFunctionsService", void 0);
__decorate([
    CustomInject(WebpackPostcssFontMagicianService),
    __metadata("design:type", WebpackPostcssFontMagicianService)
], WebpackPostcssService.prototype, "webpackPostcssFontMagicianService", void 0);
__decorate([
    CustomInject(WebpackTailwindcssService),
    __metadata("design:type", WebpackTailwindcssService)
], WebpackPostcssService.prototype, "webpackTailwindcssService", void 0);
__decorate([
    CustomInject(WebpackPostcssRfsAutopilotService),
    __metadata("design:type", WebpackPostcssRfsAutopilotService)
], WebpackPostcssService.prototype, "webpackPostcssRfsAutopilotService", void 0);
__decorate([
    CustomInject(WebpackRfsService),
    __metadata("design:type", WebpackRfsService)
], WebpackPostcssService.prototype, "webpackRfsService", void 0);
WebpackPostcssService = __decorate([
    CustomInjectable()
], WebpackPostcssService);
export { WebpackPostcssService };
//# sourceMappingURL=webpack-postcss.service.js.map