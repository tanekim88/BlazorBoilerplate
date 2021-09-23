import { NestFactory } from '@nestjs/core';
import vite from 'vite';
export class ViteBase {
    viteModule;
    service;
    constructor(viteModule, service) {
        this.viteModule = viteModule;
        this.service = service;
        this.createViteConfig = this.createViteConfig.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }
    async createViteConfig(env, options) {
        if (options?.mode) {
            process.env.NODE_ENV = options?.mode;
        }
        try {
            const app = await NestFactory.create(this.viteModule, { abortOnError: false });
            await app.init();
            const svc = app.get(this.service);
            const config = svc.createConfiguration();
            return config;
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }
    async build() {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig();
            console.dir(config);
            await vite.build(config);
        }
    }
    async watch() {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig();
            const s = await vite.createServer(config);
            await s.listen(5001);
        }
    }
}
//# sourceMappingURL=vite.base.js.map