import { WebpackClosureWebpackPluginService } from './webpack-closure-plugin/webpack-closure-plugin.service';

import { WebpackCssMinimizerPluginService } from './webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service';
import { WebpackOptimizeCssAssetsPluginService } from './webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service';
import { WebpackTerserPluginService } from './webpack-terser-plugin/webpack-terser-plugin.service';
import { WebpackMinimizersService } from './webpack-minimizers/webpack-minimizers.service';
import { CustomModule } from '../../functions/process-webpack-providers';

@CustomModule({
    providers: [
        WebpackMinimizersService,
        WebpackClosureWebpackPluginService,
        WebpackCssMinimizerPluginService,
        WebpackOptimizeCssAssetsPluginService,
        WebpackTerserPluginService,
    ],
})
export class WebpackMinimizersModule {}
