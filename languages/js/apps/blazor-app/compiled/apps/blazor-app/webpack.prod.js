import { WebpackBase } from '@projects/shared/webpack.base';
import { BlazorAppWebpackDevConfigService, BlazorAppWebpackDevService, } from './src/webpack/webpack-dev/webpack-dev.service';
import { BlazorAppWebpackModule } from './src/webpack/webpack.module';
const webpackBase = new WebpackBase(BlazorAppWebpackModule, [
    BlazorAppWebpackDevConfigService,
    BlazorAppWebpackDevService,
]);
export default webpackBase.createWebpackConfigs;
webpackBase.execute();
//# sourceMappingURL=webpack.prod.js.map