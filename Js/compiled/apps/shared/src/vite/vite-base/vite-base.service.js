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
import { MergeService } from '../../modules/utilities/modules/merge/merge/merge.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '../vite-plugins/vite-plugins/vite-plugins.service';
let ViteBaseService = class ViteBaseService {
    mergeService;
    environmentService;
    vitePluginsService;
    createConfiguration(options) {
        const plugins = this.vitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions({
            build: {
                rollupOptions: {},
                watch: {},
                assetsInlineLimit: 4096,
                cssCodeSplit: true,
                sourcemap: false
            },
            css: {
                preprocessorOptions: {
                    scss: {
                    // additionalData:`$injectedColor: orange;`
                    }
                },
                postcss: {}
            },
            optimizeDeps: {
                include: [],
                exclude: [],
                esbuildOptions: {
                    keepNames: false,
                }
            },
            plugins,
            resolve: {
                // alias:[{
                //   find:'@blazorApp',
                //   replacement:'./blazorApp'
                // }]
                extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
__decorate([
    CustomInject(VitePluginsService),
    __metadata("design:type", VitePluginsService)
], ViteBaseService.prototype, "vitePluginsService", void 0);
ViteBaseService = __decorate([
    CustomInjectable()
], ViteBaseService);
export { ViteBaseService };
//# sourceMappingURL=vite-base.service.js.map