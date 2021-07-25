import { NestFactory } from '@nestjs/core';
import { ViteBaseService } from './src/vite/vite-base/vite-base.service';
import { ViteModule } from './src/vite/vite.module';

import { WebpackBaseService } from './src/webpack/webpack-base/webpack-base.service';

import { WebpackModule } from './src/webpack/webpack.module';

export class ViteBase {

    constructor(private viteModule: { new (): ViteModule }, private services: { new (): ViteBaseService }[]) {
        this.createViteConfigs = this.createViteConfigs.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    async createViteConfigs(env?, options?) {
        if (options?.mode) {
            process.env.NODE_ENV = options?.mode;
        }

        const app = await NestFactory.create(this.viteModule);
        await app.init();

        return this.services.map((service) => {
            const svc = app.get(service);

            const config = svc.createConfiguration();
            
            return config;
        });
    }

    build() {
        if (process.env.NODE_ENV) {
            (async () => {
                const configs = await this.createViteConfigs();
            })();
        }
    }

    watch() {
        if (process.env.NODE_ENV) {
            (async () => {
                const configs = await this.createViteConfigs();
            })();
        }
    }
}
