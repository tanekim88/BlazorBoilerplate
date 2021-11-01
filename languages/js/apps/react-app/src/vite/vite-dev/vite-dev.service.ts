import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { ReactAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class ReactAppViteDevService extends ViteDevService {
    @CustomInject(ReactAppViteSharedService)
    protected reactAppViteSharedService: ReactAppViteSharedService;
    
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.reactAppViteSharedService.createConfiguration(),
            {
                build:{
                    minify:false
                }
            } as UserConfig,
            options,
        );
    }
}
