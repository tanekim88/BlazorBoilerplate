var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from "#shared/src/functions/process-providers";
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
let PostcssModule = class PostcssModule {
};
PostcssModule = __decorate([
    CustomModule({
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
], PostcssModule);
export { PostcssModule };
//# sourceMappingURL=postcss.module.js.map