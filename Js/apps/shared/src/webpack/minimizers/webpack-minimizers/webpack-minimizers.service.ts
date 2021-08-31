import { WebpackClosureWebpackPluginService } from '../webpack-closure-plugin/webpack-closure-plugin.service';
import { WebpackCssMinimizerPluginService } from '../webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service';
import { WebpackOptimizeCssAssetsPluginService } from '../webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service';
import { WebpackTerserPluginService } from '../webpack-terser-plugin/webpack-terser-plugin.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackMinimizersService {
    @CustomInject(WebpackClosureWebpackPluginService)
    protected webpackClosurePluginService: WebpackClosureWebpackPluginService;
    @CustomInject(WebpackCssMinimizerPluginService)
    protected webpackCssMinimizerPluginService: WebpackCssMinimizerPluginService;
    @CustomInject(WebpackOptimizeCssAssetsPluginService)
    protected webpackOptimizeCssAssetsPluginService: WebpackOptimizeCssAssetsPluginService;
    @CustomInject(WebpackTerserPluginService)
    protected webpackTerserPluginService: WebpackTerserPluginService;

    createMinimizers() {
        const minimizers = [];
        minimizers.push(this.webpackTerserPluginService.createPlugin());
        minimizers.push(this.webpackOptimizeCssAssetsPluginService.createPlugin());
        minimizers.push(this.webpackCssMinimizerPluginService.createPlugin());
        // minimizers.push(this.webpackClosurePluginService.createPlugin());

        return minimizers;
    }
}
