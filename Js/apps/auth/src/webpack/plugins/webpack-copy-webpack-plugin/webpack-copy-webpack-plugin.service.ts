import path from 'path';
import { WebpackCopyWebpackPluginService } from '@shared/src/webpack/plugins/webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { authPaths } from '@auth/paths';
import { AuthEnvironmentService } from '@auth/src/modules/environment/environment/environment.service';

@CustomInjectable()
export class AuthWebpackCopyWebpackPluginService extends WebpackCopyWebpackPluginService {
    @CustomInject(AuthEnvironmentService)
    private authEnvironmentService: AuthEnvironmentService;

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                patterns: [
                    {
                        from: path.resolve(authPaths.src.toAbsolutePath(), 'appsettings.json'),
                        to: '',
                    },
                    {
                        from: path.resolve(authPaths.src.toAbsolutePath(), 'appsettings.Development.json'),
                        to: '',
                    },
                ],
            },
            options,
        );
    }
}
