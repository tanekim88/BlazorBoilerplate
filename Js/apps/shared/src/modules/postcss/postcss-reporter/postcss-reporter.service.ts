import PostcssReporter from 'postcss-reporter';

import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssReporterService extends PostcssBaseService {
    constructor() {
        super(PostcssReporter);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                clearReportedMessages: true,
            },
            options,
        );
    }
}

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
