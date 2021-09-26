import { CustomModule } from "@projects/shared/src/functions/process-providers";
import { EnvironmentService } from "../environment/environment/environment.service";
import { CssnanoService } from "./services/cssnano/cssnano.service";
import { PostcssCombineDuplicatedSelectorsService } from "./services/postcss-combine-duplicated-selectors/postcss-combine-duplicated-selectors.service";
import { PostcssFontMagicianService } from "./services/postcss-font-magician/postcss-font-magician.service";
import { PostcssFunctionsService } from "./services/postcss-functions/postcss-functions.service";
import { PostcssPresetEnvService } from "./services/postcss-preset-env/postcss-preset-env.service";
import { PostcssPurgecssService } from "./services/postcss-purgecss/postcss-purgecss.service";
import { PostcssReporterService } from "./services/postcss-reporter/postcss-reporter.service";
import { PostcssRfsAutopilotService } from "./services/postcss-rfs-autopilot/postcss-rfs-autopilot.service";
import { RfsService } from "./services/rfs/rfs.service";

@CustomModule({
    providers: [
        CssnanoService,
        PostcssReporterService,
        EnvironmentService,
        PostcssPurgecssService,
        PostcssPresetEnvService,
        PostcssCombineDuplicatedSelectorsService,
        PostcssFunctionsService,
        PostcssFontMagicianService,
        PostcssRfsAutopilotService,
        RfsService,
    ],
})
export class PostcssModule { }
