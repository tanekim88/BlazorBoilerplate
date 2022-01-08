import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { AuthViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class AuthViteDevService extends ViteDevService {
    @CustomInject(AuthViteSharedService)
    protected authViteSharedService: AuthViteSharedService;
    
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.authViteSharedService.createConfiguration(),
            {
                build:{
                    minify:false
                }
            } as UserConfig,
            options,
        );
    }
}
