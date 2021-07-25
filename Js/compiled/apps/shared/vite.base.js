import { NestFactory } from '@nestjs/core';
export class ViteBase {
    constructor(viteModule, services) {
        this.viteModule = viteModule;
        this.services = services;
        this.createViteConfigs = this.createViteConfigs.bind(this);
        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }
    async createViteConfigs(env, options) {
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
//# sourceMappingURL=vite.base.js.map