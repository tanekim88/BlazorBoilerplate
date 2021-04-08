import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackWebpackFixStyleOnlyEntriesService } from '@shared/src/webpack/plugins/webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';

const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

@CustomInjectable()
export class AuthWebpackWebpackFixStyleOnlyEntriesService extends WebpackWebpackFixStyleOnlyEntriesService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
