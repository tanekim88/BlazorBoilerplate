var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackClosureWebpackPluginService } from './webpack-closure-plugin/webpack-closure-plugin.service';
import { WebpackCssMinimizerPluginService } from './webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service';
import { WebpackOptimizeCssAssetsPluginService } from './webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service';
import { WebpackTerserPluginService } from './webpack-terser-plugin/webpack-terser-plugin.service';
import { WebpackMinimizersService } from './webpack-minimizers/webpack-minimizers.service';
import { CustomModule } from '../../functions/process-providers';
let WebpackMinimizersModule = class WebpackMinimizersModule {
};
WebpackMinimizersModule = __decorate([
    CustomModule({
        providers: [
            WebpackMinimizersService,
            WebpackClosureWebpackPluginService,
            WebpackCssMinimizerPluginService,
            WebpackOptimizeCssAssetsPluginService,
            WebpackTerserPluginService,
        ],
    })
], WebpackMinimizersModule);
export { WebpackMinimizersModule };
//# sourceMappingURL=minimizers.module.js.map