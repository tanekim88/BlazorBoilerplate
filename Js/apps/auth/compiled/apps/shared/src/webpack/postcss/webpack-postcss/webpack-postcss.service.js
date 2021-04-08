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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackPostcssService = void 0;
const environment_service_1 = require("../../../modules/environment/environment/environment.service");
const webpack_cssnano_service_1 = require("../webpack-cssnano/webpack-cssnano.service");
const webpack_postcss_font_magician_service_1 = require("../webpack-postcss-font-magician/webpack-postcss-font-magician.service");
const webpack_postcss_functions_service_1 = require("../webpack-postcss-functions/webpack-postcss-functions.service");
const webpack_postcss_preset_env_service_1 = require("../webpack-postcss-preset-env/webpack-postcss-preset-env.service");
const webpack_postcss_reporter_service_1 = require("../webpack-postcss-reporter/webpack-postcss-reporter.service");
const webpack_postcss_rfs_autopilot_service_1 = require("../webpack-postcss-rfs-autopilot/webpack-postcss-rfs-autopilot.service");
const webpack_rfs_service_1 = require("../webpack-rfs/webpack-rfs.service");
const webpack_tailwindcss_service_1 = require("../webpack-tailwindcss/webpack-tailwindcss.service");
// Sealed class.
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
const webpack_postcss_purgecss_service_1 = require("../webpack-postcss-purgecss/webpack-postcss-purgecss.service");
const webpack_postcss_combine_duplicated_selectors_service_1 = require("../webpack-postcss-combine-duplicated-selectors/webpack-postcss-combine-duplicated-selectors.service");
let WebpackPostcssService = class WebpackPostcssService {
    createPostcssPlugins() {
        const plugins = [];
        // plugins.push(this.webpackPostcssRfsAutopilotService.createPlugin());
        // plugins.push(this.webpackRfsService.createPlugin());
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
    process_webpack_providers_2.CustomInject(webpack_cssnano_service_1.WebpackCssnanoService),
    __metadata("design:type", webpack_cssnano_service_1.WebpackCssnanoService)
], WebpackPostcssService.prototype, "webpackCssNanoService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_reporter_service_1.WebpackPostcssReporterService),
    __metadata("design:type", webpack_postcss_reporter_service_1.WebpackPostcssReporterService)
], WebpackPostcssService.prototype, "webpackPostcssReporterService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackPostcssService.prototype, "environmentService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_purgecss_service_1.WebpackPostcssPurgecssService),
    __metadata("design:type", webpack_postcss_purgecss_service_1.WebpackPostcssPurgecssService)
], WebpackPostcssService.prototype, "webpackPostcssPurgecssService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_preset_env_service_1.WebpackPostcssPresetEnvService),
    __metadata("design:type", webpack_postcss_preset_env_service_1.WebpackPostcssPresetEnvService)
], WebpackPostcssService.prototype, "webpackPostcssPresetEnvService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_combine_duplicated_selectors_service_1.WebpackPostcssCombineDuplicatedSelectorsService),
    __metadata("design:type", webpack_postcss_combine_duplicated_selectors_service_1.WebpackPostcssCombineDuplicatedSelectorsService)
], WebpackPostcssService.prototype, "webpackPostcssCombineDuplicatedSelectorsService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_functions_service_1.WebpackPostcssFunctionsService),
    __metadata("design:type", webpack_postcss_functions_service_1.WebpackPostcssFunctionsService)
], WebpackPostcssService.prototype, "webpackPostcssFunctionsService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_font_magician_service_1.WebpackPostcssFontMagicianService),
    __metadata("design:type", webpack_postcss_font_magician_service_1.WebpackPostcssFontMagicianService)
], WebpackPostcssService.prototype, "webpackPostcssFontMagicianService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_tailwindcss_service_1.WebpackTailwindcssService),
    __metadata("design:type", webpack_tailwindcss_service_1.WebpackTailwindcssService)
], WebpackPostcssService.prototype, "webpackTailwindcssService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_postcss_rfs_autopilot_service_1.WebpackPostcssRfsAutopilotService),
    __metadata("design:type", webpack_postcss_rfs_autopilot_service_1.WebpackPostcssRfsAutopilotService)
], WebpackPostcssService.prototype, "webpackPostcssRfsAutopilotService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_rfs_service_1.WebpackRfsService),
    __metadata("design:type", webpack_rfs_service_1.WebpackRfsService)
], WebpackPostcssService.prototype, "webpackRfsService", void 0);
WebpackPostcssService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackPostcssService);
exports.WebpackPostcssService = WebpackPostcssService;
//# sourceMappingURL=webpack-postcss.service.js.map