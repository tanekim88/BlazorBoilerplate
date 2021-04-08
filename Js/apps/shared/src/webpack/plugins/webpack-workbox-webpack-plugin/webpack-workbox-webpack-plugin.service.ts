import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import WorkboxWebpackPlugin, { InjectManifestOptions } from 'workbox-webpack-plugin';

import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

@CustomInjectable()
export class WebpackWorkboxWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(WorkboxWebpackPlugin.InjectManifest);
    }

    createOptions(options?: InjectManifestOptions): InjectManifestOptions {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                swSrc: this.environmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath(),
                swDest: 'service-worker.js',
                include: [this.environmentService.logoPath],
            } as InjectManifestOptions,
            options,
        ) as InjectManifestOptions;
    }
}
