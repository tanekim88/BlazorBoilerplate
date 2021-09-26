"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackPostcssModule = void 0;
const webpack_cssnano_service_1 = require("./webpack-cssnano/webpack-cssnano.service");
const webpack_postcss_advanced_variables_service_1 = require("./webpack-postcss-advanced-variables/webpack-postcss-advanced-variables.service");
const webpack_postcss_each_service_1 = require("./webpack-postcss-each/webpack-postcss-each.service");
const webpack_postcss_conditionals_service_1 = require("./webpack-postcss-conditionals/webpack-postcss-conditionals.service");
const webpack_postcss_extend_rule_service_1 = require("./webpack-postcss-extend-rule/webpack-postcss-extend-rule.service");
const webpack_postcss_font_magician_service_1 = require("./webpack-postcss-font-magician/webpack-postcss-font-magician.service");
const webpack_postcss_for_service_1 = require("./webpack-postcss-for/webpack-postcss-for.service");
const webpack_postcss_functions_service_1 = require("./webpack-postcss-functions/webpack-postcss-functions.service");
const webpack_postcss_import_service_1 = require("./webpack-postcss-import/webpack-postcss-import.service");
const webpack_postcss_preset_env_service_1 = require("./webpack-postcss-preset-env/webpack-postcss-preset-env.service");
const webpack_postcss_reporter_service_1 = require("./webpack-postcss-reporter/webpack-postcss-reporter.service");
const webpack_postcss_rfs_autopilot_service_1 = require("./webpack-postcss-rfs-autopilot/webpack-postcss-rfs-autopilot.service");
const webpack_postcss_sassy_import_service_1 = require("./webpack-postcss-sassy-import/webpack-postcss-sassy-import.service");
const webpack_postcss_simple_vars_service_1 = require("./webpack-postcss-simple-vars/webpack-postcss-simple-vars.service");
const webpack_rfs_service_1 = require("./webpack-rfs/webpack-rfs.service");
const webpack_stylelint_service_1 = require("./webpack-stylelint/webpack-stylelint.service");
const webpack_tailwindcss_service_1 = require("./webpack-tailwindcss/webpack-tailwindcss.service");
const process_webpack_providers_1 = require("../../functions/process-webpack-providers");
const webpack_postcss_service_1 = require("./webpack-postcss/webpack-postcss.service");
const webpack_postcss_purgecss_service_1 = require("./webpack-postcss-purgecss/webpack-postcss-purgecss.service");
const webpack_postcss_combine_duplicated_selectors_service_1 = require("./webpack-postcss-combine-duplicated-selectors/webpack-postcss-combine-duplicated-selectors.service");
let WebpackPostcssModule = class WebpackPostcssModule {
};
WebpackPostcssModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            webpack_postcss_service_1.WebpackPostcssService,
            webpack_cssnano_service_1.WebpackCssnanoService,
            webpack_postcss_advanced_variables_service_1.WebpackPostcssAdvancedVariablesService,
            webpack_postcss_each_service_1.WebpackPostcssEachService,
            webpack_postcss_conditionals_service_1.WebpackPostcssConditionalsService,
            webpack_postcss_extend_rule_service_1.WebpackPostcssExtendRuleService,
            webpack_postcss_font_magician_service_1.WebpackPostcssFontMagicianService,
            webpack_postcss_for_service_1.WebpackPostcssForService,
            webpack_postcss_functions_service_1.WebpackPostcssFunctionsService,
            webpack_postcss_import_service_1.WebpackPostcssImportService,
            webpack_postcss_preset_env_service_1.WebpackPostcssPresetEnvService,
            webpack_postcss_reporter_service_1.WebpackPostcssReporterService,
            webpack_postcss_rfs_autopilot_service_1.WebpackPostcssRfsAutopilotService,
            webpack_postcss_sassy_import_service_1.WebpackPostcssSassyImportService,
            webpack_postcss_simple_vars_service_1.WebpackPostcssSimpleVarsService,
            webpack_rfs_service_1.WebpackRfsService,
            webpack_stylelint_service_1.WebpackStylelintService,
            webpack_tailwindcss_service_1.WebpackTailwindcssService,
            webpack_postcss_purgecss_service_1.WebpackPostcssPurgecssService,
            webpack_postcss_combine_duplicated_selectors_service_1.WebpackPostcssCombineDuplicatedSelectorsService,
        ],
        imports: [],
    })
], WebpackPostcssModule);
exports.WebpackPostcssModule = WebpackPostcssModule;
//# sourceMappingURL=webpack-postcss.module.js.map