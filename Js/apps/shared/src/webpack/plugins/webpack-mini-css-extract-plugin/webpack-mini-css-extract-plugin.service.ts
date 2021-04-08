import { Optional } from '@nestjs/common';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

@CustomInjectable()
export class WebpackMiniCssExtractPluginConfigService extends WebpackPluginBaseService {
    constructor(@Optional() classConstructor?) {
        super(classConstructor ?? MiniCssExtractPlugin);
    }

    createOptions(options?: MiniCssExtractPlugin.PluginOptions) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                filename: '[id].css',
                chunkFilename: '[id].css',
            },
            options,
        );
    }
}

@CustomInjectable()
export class WebpackMiniCssExtractPluginService extends WebpackPluginBaseService {
    constructor(@Optional() classConstructor?) {
        super(classConstructor ?? MiniCssExtractPlugin);
    }

    createOptions(options?: MiniCssExtractPlugin.PluginOptions) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                filename: '[id].css',
                chunkFilename: '[id].css',
            },
            options,
        );
    }
}
