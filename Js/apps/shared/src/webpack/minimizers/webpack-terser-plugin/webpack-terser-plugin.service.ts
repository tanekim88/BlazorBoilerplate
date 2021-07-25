import { WebpackPluginBaseService } from '../../plugins/webpack-plugin-base/webpack-plugin-base.service';
import TerserPlugins from 'terser-webpack-plugin';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackTerserPluginService extends WebpackPluginBaseService {
    constructor() {
        super(TerserPlugins);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
