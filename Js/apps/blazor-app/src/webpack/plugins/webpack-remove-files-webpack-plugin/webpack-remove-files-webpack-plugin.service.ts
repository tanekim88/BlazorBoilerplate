import { CustomInjectable } from '#shared/src/functions/process-providers';
import {
    WebpackRemoveFilesWebpackPluginService,
    WebpackPreRemoveFilesWebpackPluginService,
} from '#shared/src/webpack/plugins/webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';

const RemoveFilesWebpackPlugin = require('remove-files-webpack-plugin');

@CustomInjectable()
export class BlazorAppWebpackPreRemoveFilesWebpackPluginService extends WebpackPreRemoveFilesWebpackPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}

@CustomInjectable()
export class BlazorAppWebpackRemoveFilesWebpackPluginService extends WebpackRemoveFilesWebpackPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
