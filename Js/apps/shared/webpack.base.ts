import { NestFactory } from '@nestjs/core';
import webpack from 'webpack';
import { WebpackBaseService } from './src/webpack/webpack-base/webpack-base.service';

import { WebpackModule } from './src/webpack/webpack.module';

export class WebpackBase {
    /**
     *
     */
    constructor(private webpackModule: { new (): WebpackModule }, private services: { new (): WebpackBaseService }[]) {
        this.createWebpackConfigs = this.createWebpackConfigs.bind(this);
        this.execute = this.execute.bind(this);
    }

    async createWebpackConfigs(env?, options?) {
        if (options?.mode) {
            process.env.NODE_ENV = options?.mode;
        }

        const app = await NestFactory.create(this.webpackModule);
        await app.init();

        return this.services.map((service) => {
            const svc = app.get(service);

            const config = svc.createConfiguration();
            return config;
        });
    }

    execute() {
        if (process.env.NODE_ENV) {
            (async () => {
                const configs = await this.createWebpackConfigs();

                console.dir(configs);
                const compiler = webpack(configs);

                const watching = compiler.watch(
                    {
                        // Example watchOptions
                        aggregateTimeout: 300,
                        poll: undefined,
                    },
                    (err, stats) => {
                        if (err) {
                            console.error(err);
                        }
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

                // watching.close(() => {
                //     console.log('Watching Ended.');
                // });
            })();
        }
    }
}
