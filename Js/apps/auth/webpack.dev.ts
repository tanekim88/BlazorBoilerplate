import { WebpackBase } from '#shared/webpack.base';
import {
    AuthWebpackDevConfigService,
    AuthWebpackDevService,
} from './src/webpack/webpack-dev/webpack-dev.service';
import { AuthWebpackModule } from './src/webpack/webpack.module';

const webpackBase = new WebpackBase(AuthWebpackModule, [
    AuthWebpackDevConfigService,
    AuthWebpackDevService,
]);

export default webpackBase.createWebpackConfigs;

webpackBase.execute();
