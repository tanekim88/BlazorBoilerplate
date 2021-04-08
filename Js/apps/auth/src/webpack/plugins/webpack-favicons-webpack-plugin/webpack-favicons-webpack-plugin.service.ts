import { CustomInject, CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackFaviconsWebpackPluginService } from '@shared/src/webpack/plugins/webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { AuthEnvironmentService } from '../../../modules/environment/environment/environment.service';

@CustomInjectable()
export class AuthWebpackFaviconsWebpackPluginService extends WebpackFaviconsWebpackPluginService {
    @CustomInject(AuthEnvironmentService)
    private authEnvironmentService: AuthEnvironmentService;

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                logo: this.authEnvironmentService.logoPath, // svg works t
            },
            options,
        );
    }
}
