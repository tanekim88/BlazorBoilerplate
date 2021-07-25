import path from 'path';
import { WebpackCopyWebpackPluginService } from '@shared/src/webpack/plugins/webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { blazorAppPaths } from '@blazor-app/paths';
import { BlazorAppEnvironmentService } from '@blazor-app/src/modules/environment/environment/environment.service';

@CustomInjectable()
export class BlazorAppWebpackCopyWebpackPluginService extends WebpackCopyWebpackPluginService {
    @CustomInject(BlazorAppEnvironmentService)
    private blazorAppClientEnvironmentService: BlazorAppEnvironmentService;

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                patterns: [
                    {
                        from: path.resolve(blazorAppPaths.src.toAbsolutePath(), 'appsettings.json'),
                        to: '',
                    },
                    {
                        from: path.resolve(blazorAppPaths.src.toAbsolutePath(), 'appsettings.Development.json'),
                        to: '',
                    },
                ],
            },
            options,
        );
    }
}
