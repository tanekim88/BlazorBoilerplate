var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackCssnanoService } from './webpack-cssnano/webpack-cssnano.service';
import { WebpackPostcssAdvancedVariablesService } from './webpack-postcss-advanced-variables/webpack-postcss-advanced-variables.service';
import { WebpackPostcssEachService } from './webpack-postcss-each/webpack-postcss-each.service';
import { WebpackPostcssConditionalsService } from './webpack-postcss-conditionals/webpack-postcss-conditionals.service';
import { WebpackPostcssExtendRuleService } from './webpack-postcss-extend-rule/webpack-postcss-extend-rule.service';
import { WebpackPostcssFontMagicianService } from './webpack-postcss-font-magician/webpack-postcss-font-magician.service';
import { WebpackPostcssForService } from './webpack-postcss-for/webpack-postcss-for.service';
import { WebpackPostcssFunctionsService } from './webpack-postcss-functions/webpack-postcss-functions.service';
import { WebpackPostcssImportService } from './webpack-postcss-import/webpack-postcss-import.service';
import { WebpackPostcssPresetEnvService } from './webpack-postcss-preset-env/webpack-postcss-preset-env.service';
import { WebpackPostcssReporterService } from './webpack-postcss-reporter/webpack-postcss-reporter.service';
import { WebpackPostcssRfsAutopilotService } from './webpack-postcss-rfs-autopilot/webpack-postcss-rfs-autopilot.service';
import { WebpackPostcssSassyImportService } from './webpack-postcss-sassy-import/webpack-postcss-sassy-import.service';
import { WebpackPostcssSimpleVarsService } from './webpack-postcss-simple-vars/webpack-postcss-simple-vars.service';
import { WebpackRfsService } from './webpack-rfs/webpack-rfs.service';
import { WebpackStylelintService } from './webpack-stylelint/webpack-stylelint.service';
import { WebpackTailwindcssService } from './webpack-tailwindcss/webpack-tailwindcss.service';
import { CustomModule } from '../../functions/process-providers';
import { WebpackPostcssService } from './webpack-postcss/webpack-postcss.service';
import { WebpackPostcssPurgecssService } from './webpack-postcss-purgecss/webpack-postcss-purgecss.service';
import { WebpackPostcssCombineDuplicatedSelectorsService } from './webpack-postcss-combine-duplicated-selectors/webpack-postcss-combine-duplicated-selectors.service';
let WebpackPostcssModule = class WebpackPostcssModule {
};
WebpackPostcssModule = __decorate([
    CustomModule({
        providers: [
            WebpackPostcssService,
            WebpackCssnanoService,
            WebpackPostcssAdvancedVariablesService,
            WebpackPostcssEachService,
            WebpackPostcssConditionalsService,
            WebpackPostcssExtendRuleService,
            WebpackPostcssFontMagicianService,
            WebpackPostcssForService,
            WebpackPostcssFunctionsService,
            WebpackPostcssImportService,
            WebpackPostcssPresetEnvService,
            WebpackPostcssReporterService,
            WebpackPostcssRfsAutopilotService,
            WebpackPostcssSassyImportService,
            WebpackPostcssSimpleVarsService,
            WebpackRfsService,
            WebpackStylelintService,
            WebpackTailwindcssService,
            WebpackPostcssPurgecssService,
            WebpackPostcssCombineDuplicatedSelectorsService,
        ],
        imports: [],
    })
], WebpackPostcssModule);
export { WebpackPostcssModule };
//# sourceMappingURL=webpack-postcss.module.js.map