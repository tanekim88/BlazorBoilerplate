import { BlazorAppPaths } from '#blazor-app/paths';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginGlobInputService } from '#shared/src/vite/vite-plugins/vite-plugin-glob-input/vite-plugin-glob-input.service';
import { VitePluginHtmlService } from '#shared/src/vite/vite-plugins/vite-plugin-html/vite-plugin-html.service';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';

@CustomInjectable()
export class BlazorAppVitePluginsService extends VitePluginsService {
    @CustomInject(BlazorAppEnvironmentService)
    blazorAppEnvironmentService: BlazorAppEnvironmentService

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {

        return [
            this.vitePluginHtmlService.createPlugin({
                externals: [
                    // the type can be 'js' or 'css',
                    // and you can pass a pos field to control the the position in which the file will be inserted.
                    // the xxxx1.js will be inserted before the bundle,
                    // and the xxxx2.js will be inserted after the bundle as default
                    // you can set an `inject` field here to cover the outer `inject`
                    { type: 'js', file: '//xxxx1.js', pos: 'before' },
                    { type: 'js', file: '//xxxx2.js' }
                ]
            }),
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [this.blazorAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()],
                        relativeTo: this.blazorAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                        projectRoot: this.blazorAppEnvironmentService.localPaths.toAbsolutePath()
                    }
                ]
            })
        ]
    }

}
