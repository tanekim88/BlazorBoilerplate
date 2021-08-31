import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { sharedPaths } from '#shared/paths';
import path from 'path';

@CustomInjectable()
export class WebpackSvgSpriteMapWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(SVGSpritemapPlugin);
    }

    createManyOptions(options1, options2) {
        const optionsOverride = [
            [path.resolve(sharedPaths.node_modules.toAbsolutePath(), '@icon/open-iconic/icons/*.svg')],
            {
                output: {
                    filename: 'open-iconic-icons.svg',
                },
                sprite: {
                    prefix: 'oi oi-',
                },
            } as SVGSpritemapPlugin.Options,
        ];
        const options = [options1, options2];

        return super
            .createManyOptions([], {})
            .map((opt, i) => {
                return this.mergeService.mergeOptions(opt, optionsOverride[i]);
            })
            .map((opt, i) => {
                return this.mergeService.mergeOptions(opt, options[i]);
            });
    }
}
