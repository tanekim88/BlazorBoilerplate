import { ViteBaseService } from '../vite-base/vite-base.service';

import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class ViteDevService extends ViteBaseService {
    @CustomInject(ViteSharedService)
    protected viteSharedService: ViteSharedService;

    createConfiguration(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                mode: 'development',
                build: {
                    minify: false,

                }
            } as UserConfig,
            options,
        );
    }
}
