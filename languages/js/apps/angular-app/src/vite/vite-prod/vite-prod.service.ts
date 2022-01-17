
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteProdService } from '#shared/src/vite/vite-prod/vite-prod.service';
import { AngularAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class AngularAppViteProdService extends ViteProdService {
    @CustomInject(AngularAppViteSharedService)
    protected angularAppClientViteSharedService: AngularAppViteSharedService;

    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.angularAppClientViteSharedService.createConfiguration(),
            {

            },
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
