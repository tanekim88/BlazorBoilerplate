import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { AuthPaths, authPaths } from '#root/apps/auth/paths';
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
                        fromPath: authPaths.src.templates['_Layout.cshtml'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.Pages.Shared['_Layout.cshtml'].toRelativePath())
                    },
                ],
                copy: [
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(), 'bootstrap-icons.svg'),
                    },
                    {
                        fromPath: authPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(), 'favicon.ico'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(), 'lib/jquery'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(), 'lib/jquery-validation'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(), 'lib/jquery-validation-unobtrusive'),
                    },
                ],
                empty: [
                    {
                        fromPath: AuthPaths.wwwroot.toAbsolutePath(),
                    }
                ]
            })
        ]
    }

}
