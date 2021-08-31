var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
let WebpackFaviconsWebpackPluginService = class WebpackFaviconsWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(FaviconsWebpackPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            // Your source logo (required)
            logo: this.environmentService.logoPath,
            // Enable caching and optionally specify the path to store cached data
            // Note: disabling caching may increase build times considerably
            cache: true,
            inject: true,
            mode: this.environmentService.isDevelopment ? 'light' : 'webapp',
            devMode: this.environmentService.isDevelopment ? 'light' : 'webapp',
            // Override the publicPath option usually read from webpack configuration
            //publicPath: '/static',
            // The directory to output the assets relative to the webpack output dir.
            // Relative string paths are allowed here ie '../public/static'. If this
            // option is not set, `prefix` is used.
            // outputPath: this.environmentService.environments.localEnvironment.relativePaths.outputDir,
            // Prefix path for generated assets
            prefix: 'favicons',
            // Inject html links/metadata (requires html-webpack-plugin).
            // This option accepts arguments of different types:
            //  * boolean
            //    `false`: disables injection
            //    `true`: enables injection if that is not disabled in html-webpack-plugin
            //  * function
            //    any predicate that takes an instance of html-webpack-plugin and returns either
            //    `true` or `false` to control the injection of html metadata for the html files
            //    generated by this instance.
            //inject: true,
            favicons: {
                path: '/',
                appName: this.environmentService.localConfig.name,
                appShortName: this.environmentService.localConfig.shortName,
                appDescription: this.environmentService.localConfig.description,
                developerName: this.environmentService.localConfig.developerName,
                developerURL: this.environmentService.localConfig.developerUrl,
                dir: 'auto',
                lang: 'en-US',
                background: '#fff',
                theme_color: '#fff',
                appleStatusBarStyle: 'black-translucent',
                display: 'standalone',
                orientation: 'any',
                scope: '/',
                start_url: '/?homescreen=1',
                version: '1.0',
                logging: false,
                pixel_art: false,
                loadManifestWithCredentials: false,
                icons: {
                    // Platform Options:
                    // - offset - offset in percentage
                    // - background:
                    //   * false - use default
                    //   * true - force use default, e.g. set background for Android icons
                    //   * color - set background for the specified icons
                    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
                    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
                    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
                    //
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: true,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                },
            },
        }, options);
    }
};
WebpackFaviconsWebpackPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackFaviconsWebpackPluginService);
export { WebpackFaviconsWebpackPluginService };
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.js.map