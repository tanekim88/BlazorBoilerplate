import { NestFactory } from '@nestjs/core';
import { ViteBaseService } from './src/vite/vite-base/vite-base.service';
import { ViteModule } from './src/vite/vite.module';

import { WebpackBaseService } from './src/webpack/webpack-base/webpack-base.service';

import { WebpackModule } from './src/webpack/webpack.module';
import vite from 'vite'

export class ViteBase {

    constructor(private viteModule: { new(): ViteModule }, private service: { new(): ViteBaseService }) {
        this.createViteConfig = this.createViteConfig.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    async createViteConfig(env?, options?) {
        if (options?.mode) {
            process.env.NODE_ENV = options?.mode;
        }

        const app = await NestFactory.create(this.viteModule);

        await app.init();


        const svc = app.get(this.service);

        const config = svc.createConfiguration();

        return config;

    }

    async build() {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig();
            console.dir(config)
            await vite.build(config)
        }
    }

    async watch() {
        if (process.env.NODE_ENV) {

            const config = await this.createViteConfig();
            const s = await vite.createServer(config)
            await s.listen(5001);
        }
    }
}
