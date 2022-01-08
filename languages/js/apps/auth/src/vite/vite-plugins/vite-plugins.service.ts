import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { authPaths } from '#root/apps/auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
@CustomInjectable()
export class AuthVitePluginsService extends VitePluginsService {
    @CustomInject(AuthEnvironmentService)
    authEnvironmentService: AuthEnvironmentService

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {

        return [
            solidPlugin(),
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [authPaths.src.templates['_Layout.cshtml'].toAbsolutePath()],
                        relativeTo: authPaths.src.templates.toAbsolutePath(),
                    }
                ],
                copy: [
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: 'bootstrap-icons.svg',
                    },
                    {
                        fromPath: this.authEnvironmentService.localPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: 'favicon.ico',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                        toRelativePath: 'lib/jquery',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validate/dist'),
                        toRelativePath: 'lib/jquery-validate',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                        toRelativePath: 'lib/jquery-validation-unobtrusive',
                    },
                ]
            })
        ]
    }

}
