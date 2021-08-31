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

@CustomInjectable()
export class WebpackPostcssService {
    @CustomInject(WebpackCssnanoService)
    protected webpackCssNanoService: WebpackCssnanoService;
    @CustomInject(WebpackPostcssReporterService)
    protected webpackPostcssReporterService: WebpackPostcssReporterService;
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;
    @CustomInject(WebpackPostcssPurgecssService)
    protected webpackPostcssPurgecssService: WebpackPostcssPurgecssService;
    @CustomInject(WebpackPostcssPresetEnvService)
    protected webpackPostcssPresetEnvService: WebpackPostcssPresetEnvService;
    @CustomInject(WebpackPostcssCombineDuplicatedSelectorsService)
    protected webpackPostcssCombineDuplicatedSelectorsService: WebpackPostcssCombineDuplicatedSelectorsService;
    @CustomInject(WebpackPostcssFunctionsService)
    protected webpackPostcssFunctionsService: WebpackPostcssFunctionsService;
    @CustomInject(WebpackPostcssFontMagicianService)
    protected webpackPostcssFontMagicianService: WebpackPostcssFontMagicianService;
    @CustomInject(WebpackTailwindcssService)
    protected webpackTailwindcssService: WebpackTailwindcssService;
    @CustomInject(WebpackPostcssRfsAutopilotService)
    protected webpackPostcssRfsAutopilotService: WebpackPostcssRfsAutopilotService;
    @CustomInject(WebpackRfsService)
    protected webpackRfsService: WebpackRfsService;
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
}
