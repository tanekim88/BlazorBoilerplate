import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
const RemoveFilesWebpackPlugin = require('remove-files-webpack-plugin');

@CustomInjectable()
export class WebpackPreRemoveFilesWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(RemoveFilesWebpackPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                before: {
                    // parameters for "before normal compilation" stage.
                },
                watch: {
                    // parameters for "before watch compilation" stage.
                },
                after: {
                    // parameters for "after normal and watch compilation" stage.
                },
            },
            options,
        );
    }
}
@CustomInjectable()
export class WebpackRemoveFilesWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(RemoveFilesWebpackPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                before: {
                    // parameters for "before normal compilation" stage.
                },
                watch: {
                    // parameters for "before watch compilation" stage.
                },
                after: {
                    // parameters for "after normal and watch compilation" stage.
                },
            },
            options,
        );
    }
}
