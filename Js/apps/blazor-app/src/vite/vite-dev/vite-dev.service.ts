import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { BlazorAppViteSharedService } from '../vite-shared/vite-shared.service';
import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import path from 'path';
@CustomInjectable()
export class BlazorAppViteDevService extends ViteDevService {
    @CustomInject(BlazorAppViteSharedService)
    protected blazorAppViteSharedService: BlazorAppViteSharedService;

    createConfiguration(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.blazorAppViteSharedService.createConfiguration(),
            {
                build: {
                    minify: false
                }
            } as UserConfig,
            options,
        );
    }

    createConfigurationForSass(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            this.blazorAppViteSharedService.createConfigurationForScss(),
            {
                build: {
                    minify: false
                }
            } as UserConfig,
            options,
        );
    }
}
