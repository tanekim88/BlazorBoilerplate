import { CustomInjectable, CustomInject } from "@projects/shared/src/functions/process-providers";
import { EnvironmentService } from "@projects/shared/src/modules/environment/environment/environment.service";
import { CssnanoService } from "@projects/shared/src/modules/postcss/services/cssnano/cssnano.service";
import { PostcssCombineDuplicatedSelectorsService } from "@projects/shared/src/modules/postcss/services/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service";
import { PostcssFontMagicianService } from "@projects/shared/src/modules/postcss/services/postcss-font-magician/postcss-font-magician.service";
import { PostcssFunctionsService } from "@projects/shared/src/modules/postcss/services/postcss-functions/postcss-functions.service";
import { PostcssPresetEnvService } from "@projects/shared/src/modules/postcss/services/postcss-preset-env/postcss-preset-env.service";
import { PostcssPurgecssService } from "@projects/shared/src/modules/postcss/services/postcss-purgecss/postcss-purgecss.service";
import { PostcssReporterService } from "@projects/shared/src/modules/postcss/services/postcss-reporter/postcss-reporter.service";
import { PostcssRfsAutopilotService } from "@projects/shared/src/modules/postcss/services/postcss-rfs-autopilot/postcss-rfs-autopilot.service";
import { RfsService } from "@projects/shared/src/modules/postcss/services/rfs/rfs.service";
import { TailwindcssService } from "@projects/shared/src/modules/postcss/services/tailwindcss/tailwindcss.service";

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
    // @CustomInject(TailwindcssService)
    // protected TailwindcssService: TailwindcssService;
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
