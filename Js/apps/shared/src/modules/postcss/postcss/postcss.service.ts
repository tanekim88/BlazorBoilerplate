import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { CssnanoService } from '../cssnano/cssnano.service';
import { PostcssFontMagicianService } from '../postcss-font-magician/postcss-font-magician.service';
import { PostcssFunctionsService } from '../postcss-functions/postcss-functions.service';
import { PostcssPresetEnvService } from '../postcss-preset-env/postcss-preset-env.service';
import { PostcssReporterService } from '../postcss-reporter/postcss-reporter.service';
import { PostcssRfsAutopilotService } from '../postcss-rfs-autopilot/postcss-rfs-autopilot.service';
import { RfsService } from '../rfs/rfs.service';
import { TailwindcssService } from '../tailwindcss/tailwindcss.service';

// Sealed class.
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { PostcssPurgecssService } from '../postcss-purgecss/postcss-purgecss.service';
import { PostcssCombineDuplicatedSelectorsService } from '../postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service';

@CustomInjectable()
export class PostcssService {
    @CustomInject(CssnanoService)
    protected CssNanoService: CssnanoService;
    @CustomInject(PostcssReporterService)
    protected PostcssReporterService: PostcssReporterService;
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;
    @CustomInject(PostcssPurgecssService)
    protected PostcssPurgecssService: PostcssPurgecssService;
    @CustomInject(PostcssPresetEnvService)
    protected PostcssPresetEnvService: PostcssPresetEnvService;
    @CustomInject(PostcssCombineDuplicatedSelectorsService)
    protected PostcssCombineDuplicatedSelectorsService: PostcssCombineDuplicatedSelectorsService;
    @CustomInject(PostcssFunctionsService)
    protected PostcssFunctionsService: PostcssFunctionsService;
    @CustomInject(PostcssFontMagicianService)
    protected PostcssFontMagicianService: PostcssFontMagicianService;
    @CustomInject(TailwindcssService)
    protected TailwindcssService: TailwindcssService;
    @CustomInject(PostcssRfsAutopilotService)
    protected PostcssRfsAutopilotService: PostcssRfsAutopilotService;
    @CustomInject(RfsService)
    protected RfsService: RfsService;
    createPostcssPlugins() {
        const plugins = [];
        plugins.push(this.PostcssRfsAutopilotService.createPlugin());
        plugins.push(this.RfsService.createPlugin());

        plugins.push(this.TailwindcssService.createPlugin());
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
}
