import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { SolidAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class SolidAppViteDevService extends ViteDevService {
    @CustomInject(SolidAppViteSharedService)
    protected blazorAppViteSharedService: SolidAppViteSharedService;
    
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.blazorAppViteSharedService.createConfiguration(),
            {
                build:{
                    minify:false
                }
            } as UserConfig,
            options,
        );
    }
}
