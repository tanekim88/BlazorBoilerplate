import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { AngularAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class AngularAppViteDevService extends ViteDevService {
    @CustomInject(AngularAppViteSharedService)
    protected angularAppViteSharedService: AngularAppViteSharedService;
    
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.angularAppViteSharedService.createConfiguration(),
            {
                build:{
                    minify:false
                }
            } as UserConfig,
            options,
        );
    }
}
