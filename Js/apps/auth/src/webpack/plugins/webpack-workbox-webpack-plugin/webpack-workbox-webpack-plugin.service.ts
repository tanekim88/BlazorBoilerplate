import { authPaths } from '@auth/paths';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { InjectManifestOptions } from 'workbox-webpack-plugin';
import { WebpackWorkboxWebpackPluginService } from '@shared/src/webpack/plugins/webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';

@CustomInjectable()
export class AuthWebpackWorkboxWebpackPluginService extends WebpackWorkboxWebpackPluginService {
    createOptions(options?: InjectManifestOptions): InjectManifestOptions {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                swSrc: authPaths.src['service-worker']['index.ts'].toAbsolutePath(),
                swDest: 'service-worker.js',
                // include: [this.environmentService.environments.localEnvironment.absolutePaths.src_logo_logoPath]
            } as InjectManifestOptions,
            options,
        );
    }
}
