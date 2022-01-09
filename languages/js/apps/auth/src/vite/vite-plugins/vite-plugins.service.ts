import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { AuthPaths, authPaths } from '#root/apps/auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import { Plugin } from 'vite';
@CustomInjectable()
export class AuthVitePluginsService extends VitePluginsService {
    @CustomInject(AuthEnvironmentService)
    authEnvironmentService: AuthEnvironmentService

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins(): Plugin[] {

        return [
            solidPlugin(),
            ...this.vitePluginGlobInputService.createManyPlugins({
                inputs: [
                    {
                        fromPath: authPaths.src.templates['_Layout.cshtml.html'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.Pages.Shared.toRelativePath(AuthPaths.toAbsolutePath()), '_Layout.cshtml')
                    },
                ],
                copy: [
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'bootstrap-icons.svg'),
                    },
                    {
                        fromPath: authPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'favicon.ico'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery-validation'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery-validation-unobtrusive'),
                    },
                ],
                empty: [
                    {
                        fromPath: AuthPaths.wwwroot.toAbsolutePath(),
                    }
                ]
            }),
        ]
    }

}
