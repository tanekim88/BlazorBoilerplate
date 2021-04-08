"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackBase = void 0;
const core_1 = require("@nestjs/core");
const webpack_1 = __importDefault(require("webpack"));
class WebpackBase {
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
        const app = await core_1.NestFactory.create(this.webpackModule);
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
                const compiler = webpack_1.default(configs);
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
exports.WebpackBase = WebpackBase;
//# sourceMappingURL=webpack.base.js.map