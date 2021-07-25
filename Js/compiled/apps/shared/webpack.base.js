import { NestFactory } from '@nestjs/core';
import webpack from 'webpack';
export class WebpackBase {
    /**
     *
     */
    constructor(webpackModule, services) {
        this.webpackModule = webpackModule;
        this.services = services;
        this.createWebpackConfigs = this.createWebpackConfigs.bind(this);
        this.execute = this.execute.bind(this);
    }
    async createWebpackConfigs(env, options) {
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
                const watching = compiler.watch({
                    // Example watchOptions
                    aggregateTimeout: 300,
                    poll: undefined,
                }, (err, stats) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log(stats.toString({
                        colors: true,
                    }));
                });
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
//# sourceMappingURL=webpack.base.js.map