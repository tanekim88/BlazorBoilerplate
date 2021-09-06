import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackWebpackPwaManifestService extends WebpackPluginBaseService {
    constructor() {
        super(WebpackPwaManifest);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                name: 'My Progressive Web App',
                short_name: 'MyPWA',
                description: 'My awesome Progressive Web App!',
                background_color: '#ffffff',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                    // {
                    //     src: path.resolve('src/assets/icon.png'),
                    //     sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    // },
                    // {
                    //     src: path.resolve('src/assets/large-icon.png'),
                    //     size: '1024x1024', // you can also use the specifications pattern
                    // },
                    // {
                    //     src: path.resolve('src/assets/maskable-icon.png'),
                    //     size: '1024x1024',
                    //     purpose: 'maskable',
                    // },
                ],
            } as WebpackPwaManifest.ManifestOptions,
            options,
        );
    }
}
