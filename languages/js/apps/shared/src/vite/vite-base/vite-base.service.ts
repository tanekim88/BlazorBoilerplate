import vite, { ConfigEnv, UserConfig } from 'vite';
import { EnvironmentService } from '../../modules/environment/environment/environment.service';
import { MergeService } from '../../modules/utilities/modules/merge/merge/merge.service';

import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { CustomInject } from '@projects/shared/src/functions/process-providers';
import { VitePluginsService } from '../vite-plugins/vite-plugins/vite-plugins.service';

@CustomInjectable()
export class ViteBaseService {
  @CustomInject(MergeService)
  protected mergeService: MergeService;

  @CustomInject(EnvironmentService)
  protected environmentService: EnvironmentService;

  @CustomInject(VitePluginsService)
  protected vitePluginsService: VitePluginsService;

  createConfiguration(options?: UserConfig) {
    const plugins = this.vitePluginsService.createManyPlugins();
    return this.mergeService.mergeOptions({
      build: {
        rollupOptions: {

        },
        watch: {

        },
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
        postcss: {

        }
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
    } as UserConfig, options);
  }

  async parseConfigFromFile(configEnv?: ConfigEnv, configFile?: string) {
    const configObj = await vite.loadConfigFromFile(configEnv, configFile)
    const config = configObj.config;
    return config;
  }

  build(userConfig?: UserConfig) {
    vite.build(userConfig);
  }

  watch(userConfig?: UserConfig) {
    vite.createServer(userConfig);
  }
}
