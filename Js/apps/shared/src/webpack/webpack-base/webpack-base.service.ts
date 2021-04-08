import webpack from 'webpack';
import { EnvironmentService } from '../../modules/environment/environment/environment.service';
import { MergeService } from '../../modules/utilities/merge/merge/merge.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';
@CustomInjectable()
export class WebpackBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions({}, options);
    }

    excuteWebpack(configs: any | any[]) {
        const compiler = webpack(configs as any);

        const watching = compiler.watch(
            {
                // Example watchOptions
                // aggregateTimeout: 300,
                // poll: undefined
            },
            (err, stats) => {
                console.log(
                    stats.toString({
                        colors: true, // Shows colors in the console
                    }),
                );
            },
        );

        // compiler.compilers[0].hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
        //     params['MyPlugin - data'] = 'important stuff my plugin will use later';
        //     callback();
        //   });
        // watching.invalidate();

        watching.close(() => {
            console.log('Watching Ended.');
        });
    }
}
