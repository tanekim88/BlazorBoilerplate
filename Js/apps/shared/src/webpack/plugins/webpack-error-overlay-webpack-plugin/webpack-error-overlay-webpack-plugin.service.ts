import { Optional } from '@nestjs/common';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
@CustomInjectable()
export class WebpackErrorOverlayWebpackPluginService extends WebpackPluginBaseService {
    constructor(@Optional() classConstructor) {
        super(classConstructor ?? ErrorOverlayPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
