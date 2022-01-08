
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteProdService } from '#shared/src/vite/vite-prod/vite-prod.service';
import { AuthViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class AuthViteProdService extends ViteProdService {
    @CustomInject(AuthViteSharedService)
    protected authClientViteSharedService: AuthViteSharedService;

    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.authClientViteSharedService.createConfiguration(),
            {

            },
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
