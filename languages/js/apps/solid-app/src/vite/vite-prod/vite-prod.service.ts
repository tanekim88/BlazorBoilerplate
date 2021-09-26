
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteProdService } from '@projects/shared/src/vite/vite-prod/vite-prod.service';
import { SolidAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class SolidAppViteProdService extends ViteProdService {
    @CustomInject(SolidAppViteSharedService)
    protected solidAppClientViteSharedService: SolidAppViteSharedService;

    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.solidAppClientViteSharedService.createConfiguration(),
            {

            },
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
