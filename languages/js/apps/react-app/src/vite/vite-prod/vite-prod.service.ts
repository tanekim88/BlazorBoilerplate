
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteProdService } from '#shared/src/vite/vite-prod/vite-prod.service';
import { ReactAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class ReactAppViteProdService extends ViteProdService {
    @CustomInject(ReactAppViteSharedService)
    protected reactAppClientViteSharedService: ReactAppViteSharedService;

    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.reactAppClientViteSharedService.createConfiguration(),
            {

            },
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
