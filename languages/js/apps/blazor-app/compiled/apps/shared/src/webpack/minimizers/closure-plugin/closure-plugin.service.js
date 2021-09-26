var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ClosurePlugin from 'closure-webpack-plugin';
import { WebpackPluginBaseService } from '../../plugins/webpack-plugin-base/webpack-plugin-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
// new ClosurePlugin({
//     test: /.js/,
// });
let WebpackClosureWebpackPluginService = class WebpackClosureWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(ClosurePlugin);
    }
    createManyOptions(options1, options2) {
        const optionsOverride = [
            {
                mode: 'STANDARD',
                // platform: ['javascript', 'native'],
            },
            {},
        ];
        const options = [options1, options2];
        return super
            .createManyOptions({}, {})
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, optionsOverride[i]);
        })
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, options[i]);
        });
    }
};
WebpackClosureWebpackPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackClosureWebpackPluginService);
export { WebpackClosureWebpackPluginService };
//platform - native, java or javascript.Controls which version to use of closure - compiler.By default the plugin will attempt to automatically choose the fastest option available.
//JAVASCRIPT does not require the JVM to be installed.Not all flags are supported.
//JAVA utilizes the jvm.Utilizes multiple threads for parsing and results in faster compilation for large builds.
//NATIVE only available on linux or MacOS.Faster compilation times without requiring a JVM.
//    mode - STANDARD(default ) or AGGRESSIVE_BUNDLE.Controls how the plugin utilizes the compiler.
//STANDARD mode, closure - compiler is used as a direct replacement for other minifiers as well as most Babel transformations.
//AGGRESSIVE_BUNDLE mode, the compiler performs additional optimizations of modules to produce a much smaller file
//childCompilations - boolean or function.Defaults to false.In order to decrease build times, this plugin by default only operates on the main compilation.Plugins such as extract - text - plugin and html - webpack - plugin run as child compilations and usually do not need transpilation or minification.You can enable this for all child compilations by setting this option to true.For specific control, the option can be set to a function which will be passed a compilation object.
//    Example: function(compilation) { return /html-webpack/.test(compilation.name); }.
//output - An object with either filename or chunkfilename properties.Used to override the output file naming for a particular compilation.See https://webpack.js.org/configuration/output/ for details.
//    test - An optional string or regular expression to determine whether a chunk is included in the compilation
//extraCommandArgs - Optional string or Array of strings to pass to the google - closure - compiler plugin.Can be used to pass flags to the java process.
//# sourceMappingURL=closure-plugin.service.js.map