var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import vite from 'vite';
import { EnvironmentService } from '../../modules/environment/environment/environment.service';
import { MergeService } from '../../modules/utilities/merge/merge/merge.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import path from 'path';
let ViteBaseService = class ViteBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions({
            root: path.join(__dirname, "src"),
            build: {
                outDir: path.join(__dirname, "dist"),
                rollupOptions: {
                    input: {
                        main: path.resolve(__dirname, "src", "index.html"),
                        sub: path.resolve(__dirname, "src", "sub/index2.html"),
                    },
                },
                watch: {},
                assetsInlineLimit: 4096,
                cssCodeSplit: true,
                sourcemap: false
            },
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: `$injectedColor: orange;`
                    }
                },
                postcss: {}
            },
            optimizeDeps: {
                include: [],
                exclude: [],
                keepNames: false
            },
            plugins: [
            // VitePluginGlobInput({
            // })
            ],
            resolve: {
                alias: [{
                        find: '@blazorApp',
                        replacement: './blazorApp'
                    }]
            }
        }, options);
    }
    async parseConfigFromFile(configEnv, configFile) {
        const configObj = await vite.loadConfigFromFile(configEnv, configFile);
        const config = configObj.config;
        return config;
    }
    build(userConfig) {
        vite.build(userConfig);
    }
    watch(userConfig) {
        vite.createServer(userConfig);
    }
};
__decorate([
    CustomInject(MergeService),
    __metadata("design:type", MergeService)
], ViteBaseService.prototype, "mergeService", void 0);
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], ViteBaseService.prototype, "environmentService", void 0);
ViteBaseService = __decorate([
    CustomInjectable()
], ViteBaseService);
export { ViteBaseService };
//# sourceMappingURL=vite-base.service.js.map