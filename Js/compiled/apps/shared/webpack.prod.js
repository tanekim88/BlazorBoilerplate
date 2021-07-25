import { WebpackProdService } from './src/webpack/webpack-prod/webpack-prod.service';
import { WebpackModule } from './src/webpack/webpack.module';
import { WebpackBase } from './webpack.base';
const webpackBase = new WebpackBase(WebpackModule, [WebpackProdService]);
export default webpackBase.createWebpackConfigs;
webpackBase.execute();
//# sourceMappingURL=webpack.prod.js.map