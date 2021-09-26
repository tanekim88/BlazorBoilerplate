var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from '#shared/src/functions/process-providers';
import { WebpackModule } from '#shared/src/webpack/webpack.module';
import { BlazorAppModulesModule } from '../modules/modules.module';
import { BlazorAppWebpackPluginsModule } from './plugins/webpack-plugins.module';
import { BlazorAppWebpackRulesModule } from './rules/webpack-rules.module';
import { BlazorAppWebpackDevConfigService, BlazorAppWebpackDevService } from './webpack-dev/webpack-dev.service';
import { BlazorAppWebpackProdConfigService, BlazorAppWebpackProdService } from './webpack-prod/webpack-prod.service';
import { BlazorAppWebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { BlazorAppWebpackSharedService } from './webpack-shared/webpack-shared.service';
let BlazorAppWebpackModule = class BlazorAppWebpackModule {
};
BlazorAppWebpackModule = __decorate([
    CustomModule({
        providers: [
            BlazorAppWebpackDevConfigService,
            BlazorAppWebpackProdConfigService,
            BlazorAppWebpackDevService,
            BlazorAppWebpackProdService,
            BlazorAppWebpackSharedConfigService,
            BlazorAppWebpackSharedService,
        ],
        imports: [
            BlazorAppWebpackPluginsModule,
            BlazorAppWebpackRulesModule,
            // blazorAppClientWebpackPostcssModule,
            // blazorAppClientWebpackMinimizersModule,
            BlazorAppModulesModule,
            WebpackModule,
        ],
    })
], BlazorAppWebpackModule);
export { BlazorAppWebpackModule };
//# sourceMappingURL=webpack.module.js.map