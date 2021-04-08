import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
    WebpackMiniCssExtractPluginService,
    WebpackMiniCssExtractPluginConfigService,
} from '@shared/src/webpack/plugins/webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';

@CustomInjectable()
export class AuthWebpackMiniCssExtractPluginConfigService extends WebpackMiniCssExtractPluginConfigService {
    /**
     *
     */
    constructor() {
        super(MiniCssExtractPlugin);
    }
    createOptions(options?: MiniCssExtractPlugin.PluginOptions) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}

@CustomInjectable()
export class AuthWebpackMiniCssExtractPluginService extends WebpackMiniCssExtractPluginService {
    /**
     *
     */
    constructor() {
        super(MiniCssExtractPlugin);
    }
    createOptions(options?: MiniCssExtractPlugin.PluginOptions) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
