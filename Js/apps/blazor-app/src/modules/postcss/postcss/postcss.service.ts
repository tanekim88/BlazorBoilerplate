import { CustomInjectable, CustomInject } from "#shared/src/functions/process-providers";
import { EnvironmentService } from "#shared/src/modules/environment/environment/environment.service";
import { CssnanoService } from "#shared/src/modules/postcss/cssnano/cssnano.service";
import { PostcssCombineDuplicatedSelectorsService } from "#shared/src/modules/postcss/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service";
import { PostcssFontMagicianService } from "#shared/src/modules/postcss/postcss-font-magician/postcss-font-magician.service";
import { PostcssFunctionsService } from "#shared/src/modules/postcss/postcss-functions/postcss-functions.service";
import { PostcssPresetEnvService } from "#shared/src/modules/postcss/postcss-preset-env/postcss-preset-env.service";
import { PostcssPurgecssService } from "#shared/src/modules/postcss/postcss-purgecss/postcss-purgecss.service";
import { PostcssReporterService } from "#shared/src/modules/postcss/postcss-reporter/postcss-reporter.service";
import { PostcssRfsAutopilotService } from "#shared/src/modules/postcss/postcss-rfs-autopilot/postcss-rfs-autopilot.service";
import { RfsService } from "#shared/src/modules/postcss/rfs/rfs.service";
import { TailwindcssService } from "#shared/src/modules/postcss/tailwindcss/tailwindcss.service";

@CustomInjectable()
export class BlazorAppPostcssService {
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
}
