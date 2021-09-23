import { NestFactory } from '@nestjs/core';
import { ViteBaseService } from './src/vite/vite-base/vite-base.service';
import { ViteModule } from './src/vite/vite.module';

import vite from 'vite'

export class ViteBase {

    constructor(private viteModule: { new(): ViteModule }, private service: { new(): ViteBaseService }) {
        this.createViteConfig = this.createViteConfig.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    async createViteConfig(methodName = 'createConfiguration', env?, options?) {
        if (options?.mode) {
            process.env.NODE_ENV = options?.mode;
        }

        try {

            const app = await NestFactory.create(this.viteModule, { abortOnError: false });

            await app.init();


            const svc = app.get(this.service);

            const config = svc[methodName]();

            return config;
        }
        catch (e) {
            console.error(e);
        }

        return null;
    }

    async build(method?) {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig(method);
            console.dir(config)
            await vite.build(config)
        }
    }

    async watch(method?) {
        if (process.env.NODE_ENV) {

            const config = await this.createViteConfig(method);
            const s = await vite.createServer(config)
            await s.listen(5555);
        }
    }
}
