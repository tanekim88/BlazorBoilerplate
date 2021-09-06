var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from '#shared/src/functions/process-providers';
import { WebpackModule } from '#shared/src/webpack/webpack.module';
import { SolidAppModulesModule } from '../modules/modules.module';
import { SolidAppWebpackPluginsModule } from './plugins/webpack-plugins.module';
import { SolidAppWebpackRulesModule } from './rules/webpack-rules.module';
import { SolidAppWebpackDevConfigService, SolidAppWebpackDevService } from './webpack-dev/webpack-dev.service';
import { SolidAppWebpackProdConfigService, SolidAppWebpackProdService } from './webpack-prod/webpack-prod.service';
import { SolidAppWebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { SolidAppWebpackSharedService } from './webpack-shared/webpack-shared.service';
let SolidAppWebpackModule = class SolidAppWebpackModule {
};
SolidAppWebpackModule = __decorate([
    CustomModule({
        providers: [
            SolidAppWebpackDevConfigService,
            SolidAppWebpackProdConfigService,
            SolidAppWebpackDevService,
            SolidAppWebpackProdService,
            SolidAppWebpackSharedConfigService,
            SolidAppWebpackSharedService,
        ],
        imports: [
            SolidAppWebpackPluginsModule,
            SolidAppWebpackRulesModule,
            // blazorAppClientWebpackPostcssModule,
            // blazorAppClientWebpackMinimizersModule,
            SolidAppModulesModule,
            WebpackModule,
        ],
    })
], SolidAppWebpackModule);
export { SolidAppWebpackModule };
//# sourceMappingURL=webpack.module.js.map