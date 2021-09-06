var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import PostcssReporter from 'postcss-reporter';
import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let WebpackPostcssReporterService = class WebpackPostcssReporterService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssReporter);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            clearReportedMessages: true,
        }, options);
    }
};
WebpackPostcssReporterService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackPostcssReporterService);
export { WebpackPostcssReporterService };
// Auto prefixer
// env (string): environment for Browserslist.
// cascade (boolean): should Autoprefixer use Visual Cascade, if CSS is uncompressed. Default: true
// add (boolean): should Autoprefixer add prefixes. Default is true.
// remove (boolean): should Autoprefixer [remove outdated] prefixes. Default is true.
// supports (boolean): should Autoprefixer add prefixes for @supports parameters. Default is true.
// flexbox (boolean|string): should Autoprefixer add prefixes for flexbox properties. With "no-2009" value Autoprefixer will add prefixes only for final and IE 10 versions of specification. Default is true.
// grid (false|"autoplace"|"no-autoplace"): should Autoprefixer add IE 10-11 prefixes for Grid Layout properties?
// false (default): prevent Autoprefixer from outputting CSS Grid translations.
// "autoplace": enable Autoprefixer grid translations and include autoplacement support. You can also use /* autoprefixer grid: autoplace */ in your CSS.
// "no-autoplace": enable Autoprefixer grid translations but exclude autoplacement support. You can also use /* autoprefixer grid: no-autoplace */ in your CSS. (alias for the deprecated true value)
// stats (object): custom usage statistics for > 10% in my stats browsers query.
// overrideBrowserslist (array): list of queries for target browsers. Try to not use it. The best practice is to use .browserslistrc config or browserslist key in package.json to share target browsers with Babel, ESLint and Stylelint. See Browserslist docs for available queries and default value.
// ignoreUnknownVersions (boolean): do not raise error on unknown browser version in Browserslist config. Default is false.
//# sourceMappingURL=postcss-reporter.service.js.map