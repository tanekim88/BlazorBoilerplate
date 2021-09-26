var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from '#shared/src/functions/process-providers';
import { WebpackModule } from '#shared/src/webpack/webpack.module';
import { AuthModulesModule } from '../modules/modules.module';
import { AuthWebpackPluginsModule } from './plugins/webpack-plugins.module';
import { AuthWebpackRulesModule } from './rules/webpack-rules.module';
import { AuthWebpackDevConfigService, AuthWebpackDevService } from './webpack-dev/webpack-dev.service';
import { AuthWebpackProdConfigService, AuthWebpackProdService } from './webpack-prod/webpack-prod.service';
import { AuthWebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { AuthWebpackSharedService } from './webpack-shared/webpack-shared.service';
let AuthWebpackModule = class AuthWebpackModule {
};
AuthWebpackModule = __decorate([
    CustomModule({
        providers: [
            AuthWebpackDevConfigService,
            AuthWebpackProdConfigService,
            AuthWebpackDevService,
            AuthWebpackProdService,
            AuthWebpackSharedConfigService,
            AuthWebpackSharedService,
        ],
        imports: [
            AuthWebpackPluginsModule,
            AuthWebpackRulesModule,
            // authWebpackPostcssModule,
            // authWebpackMinimizersModule,
            AuthModulesModule,
            WebpackModule,
        ],
    })
], AuthWebpackModule);
export { AuthWebpackModule };
//# sourceMappingURL=webpack.module.js.map