import { EnvironmentService } from './../../modules/environment/environment/environment.service';
import { CssnanoService } from './services/cssnano/cssnano.service';
import { PostcssFontMagicianService } from './services/postcss-font-magician/postcss-font-magician.service';
import { PostcssFunctionsService } from './services/postcss-functions/postcss-functions.service';
import { PostcssPresetEnvService } from './services/postcss-preset-env/postcss-preset-env.service';
import { PostcssReporterService } from './services/postcss-reporter/postcss-reporter.service';
import { PostcssRfsAutopilotService } from './services/postcss-rfs-autopilot/postcss-rfs-autopilot.service';
import { RfsService } from './services/rfs/rfs.service';
// import { TailwindcssService } from '../services/tailwindcss/tailwindcss.service';

// Sealed class.
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { PostcssPurgecssService } from './services/postcss-purgecss/postcss-purgecss.service';
import { PostcssCombineDuplicatedSelectorsService } from './services/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service';

@CustomInjectable()
export class PostcssService {
    @CustomInject(CssnanoService)
    protected CssNanoService: CssnanoService;
    @CustomInject(PostcssReporterService)
    protected postcssReporterService: PostcssReporterService;
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;
    @CustomInject(PostcssPurgecssService)
    protected postcssPurgecssService: PostcssPurgecssService;
    @CustomInject(PostcssPresetEnvService)
    protected postcssPresetEnvService: PostcssPresetEnvService;
    @CustomInject(PostcssCombineDuplicatedSelectorsService)
    protected postcssCombineDuplicatedSelectorsService: PostcssCombineDuplicatedSelectorsService;
    @CustomInject(PostcssFunctionsService)
    protected postcssFunctionsService: PostcssFunctionsService;
    @CustomInject(PostcssFontMagicianService)
    protected postcssFontMagicianService: PostcssFontMagicianService;
    // @CustomInject(TailwindcssService)
    // protected TailwindcssService: TailwindcssService;
    @CustomInject(PostcssRfsAutopilotService)
    protected postcssRfsAutopilotService: PostcssRfsAutopilotService;
    @CustomInject(RfsService)
    protected RfsService: RfsService;
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
}
