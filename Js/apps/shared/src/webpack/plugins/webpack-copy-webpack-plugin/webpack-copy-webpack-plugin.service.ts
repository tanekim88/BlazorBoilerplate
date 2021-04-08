import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { sharedPaths } from '@shared/paths';

@CustomInjectable()
export class WebpackCopyWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(CopyWebpackPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                patterns: [
                    {
                        from: path.resolve(
                            sharedPaths.node_modules.toAbsolutePath(),
                            'bootstrap-icons/bootstrap-icons.svg',
                        ),
                        to: '',
                    },
                    // { from: path.resolve(rootWebpackConstants.nodesModuleDir, '@fortawesome/fontawesome-free/sprites'), to: '' },
                ],
            },
            options,
        );
    }
}
