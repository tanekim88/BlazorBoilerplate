import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '@projects/shared/src/vite/vite-dev/vite-dev.service';
import { SolidAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class SolidAppViteDevService extends ViteDevService {
    @CustomInject(SolidAppViteSharedService)
    protected solidAppViteSharedService: SolidAppViteSharedService;
    
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.solidAppViteSharedService.createConfiguration(),
            {
                build:{
                    minify:false
                }
            } as UserConfig,
            options,
        );
    }
}
