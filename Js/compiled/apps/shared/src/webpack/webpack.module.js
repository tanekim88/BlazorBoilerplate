var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackDevService } from './webpack-dev/webpack-dev.service';
import { WebpackProdService } from './webpack-prod/webpack-prod.service';
import { WebpackSharedBaseService } from './webpack-shared-base/webpack-shared-base.service';
import { WebpackMinimizersModule } from './minimizers/webpack-minimizers.module';
import { WebpackPluginsModule } from './plugins/webpack-plugins.module';
import { WebpackPostcssModule } from './postcss/webpack-postcss.module';
import { WebpackRulesModule } from './rules/webpack-rules.module';
import { ModulesModule } from '../modules/modules.module';
import { WebpackBaseService } from './webpack-base/webpack-base.service';
import { CustomModule } from '../functions/process-providers';
import { WebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { WebpackSharedService } from './webpack-shared/webpack-shared.service';
import { WebpackSharedAspnetcoreService } from './webpack-shared-aspnetcore/webpack-shared-aspnetcore.service';
let WebpackModule = class WebpackModule {
};
WebpackModule = __decorate([
    CustomModule({
        imports: [ModulesModule, WebpackMinimizersModule, WebpackPluginsModule, WebpackPostcssModule, WebpackRulesModule],
        providers: [
            WebpackBaseService,
            WebpackDevService,
            WebpackProdService,
            WebpackSharedBaseService,
            WebpackSharedConfigService,
            WebpackSharedService,
            WebpackSharedAspnetcoreService,
        ],
    })
], WebpackModule);
export { WebpackModule };
//# sourceMappingURL=webpack.module.js.map