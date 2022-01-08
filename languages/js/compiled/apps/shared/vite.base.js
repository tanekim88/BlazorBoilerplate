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
    async createViteConfig(methodName = 'createConfiguration', env, options) {
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
    async build(method) {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig(method);
            console.dir(config);
            return await vite.build(config);
        }
        return null;
    }
    async watch(method) {
        if (process.env.NODE_ENV) {
            const config = await this.createViteConfig(method);
            const s = await vite.createServer(config);
            await s.listen(5555);
        }
    }
}
//# sourceMappingURL=vite.base.js.map