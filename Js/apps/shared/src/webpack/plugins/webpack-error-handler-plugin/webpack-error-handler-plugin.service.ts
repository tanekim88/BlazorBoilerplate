import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

import { Compiler } from 'webpack';

@CustomInjectable()
export class WebpackErrorHandlerPluginService extends WebpackPluginBaseService {
    constructor() {
        super(WebpackErrorHandlerPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}

export class WebpackErrorHandlerPlugin {
    /**
     * Install Plugin
     * @param {Object} compiler
     */
    apply(compiler: Compiler) {
        // Support Webpack >= 4
        // compiler.hooks.done.tap(this.constructor.name, (stats) => {
        //     console.dir('');
        // });
    }
}
