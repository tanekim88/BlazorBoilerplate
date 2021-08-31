import { CustomInjectable } from '#shared/src/functions/process-providers';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
    WebpackMiniCssExtractPluginService,
    WebpackMiniCssExtractPluginConfigService,
} from '#shared/src/webpack/plugins/webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';

@CustomInjectable()
export class BlazorAppWebpackMiniCssExtractPluginConfigService extends WebpackMiniCssExtractPluginConfigService {
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
export class BlazorAppWebpackMiniCssExtractPluginService extends WebpackMiniCssExtractPluginService {
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
