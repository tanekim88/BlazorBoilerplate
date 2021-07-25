import { CustomInjectable } from '@shared/src/functions/process-providers';
import {
    WebpackPluginsService,
    WebpackPluginsConfigService,
} from '@shared/src/webpack/plugins/webpack-plugins/webpack-plugins.service';

@CustomInjectable()
export class AuthWebpackPluginsConfigService extends WebpackPluginsConfigService {}

@CustomInjectable()
export class AuthWebpackPluginsService extends WebpackPluginsService {}
