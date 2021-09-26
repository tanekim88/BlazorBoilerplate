var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackHtmlWebpackCustomizerPlugin, WebpackHtmlWebpackCustomizerPluginService, } from '@projects/shared/src/webpack/plugins/webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
import { authPaths } from '@projects/auth/paths';
let AuthWebpackHtmlWebpackCustomizerPluginService = class AuthWebpackHtmlWebpackCustomizerPluginService extends WebpackHtmlWebpackCustomizerPluginService {
    constructor() {
        super(AuthWebpackHtmlWebpackCustomizerPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            headScripts: [],
            stylesheets: [],
        }, options);
    }
};
AuthWebpackHtmlWebpackCustomizerPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], AuthWebpackHtmlWebpackCustomizerPluginService);
export { AuthWebpackHtmlWebpackCustomizerPluginService };
export class AuthWebpackHtmlWebpackCustomizerPlugin extends WebpackHtmlWebpackCustomizerPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(AuthWebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                super.processData(data, compiler);
                const template = data.plugin.options?.template;
                if (template?.endsWith(authPaths.src.templates['_Layout.cshtml'].toAbsolutePath())) {
                    data.headTags = data.headTags.filter((d) => {
                        const href = d.attributes?.href;
                        if (href && (href.startsWith('/Shared_Material__') || href.startsWith('/Auth__'))) {
                            return false;
                        }
                        return true;
                    });
                    data.bodyTags = data.bodyTags.filter((d) => {
                        const src = d.attributes?.src;
                        if (src && (src.startsWith('/Shared_Material__') || src.startsWith('/Auth__'))) {
                            return false;
                        }
                        return true;
                    });
                }
                cb(null, data);
            });
        });
    }
}
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.js.map