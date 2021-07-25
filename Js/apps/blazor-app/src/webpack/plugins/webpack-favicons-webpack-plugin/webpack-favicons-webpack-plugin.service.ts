import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { WebpackFaviconsWebpackPluginService } from '@shared/src/webpack/plugins/webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { BlazorAppEnvironmentService } from '../../../modules/environment/environment/environment.service';

@CustomInjectable()
export class BlazorAppWebpackFaviconsWebpackPluginService extends WebpackFaviconsWebpackPluginService {
    @CustomInject(BlazorAppEnvironmentService)
    private blazorAppEnvironmentService: BlazorAppEnvironmentService;

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                logo: this.blazorAppEnvironmentService.logoPath, // svg works t
            },
            options,
        );
    }
}
