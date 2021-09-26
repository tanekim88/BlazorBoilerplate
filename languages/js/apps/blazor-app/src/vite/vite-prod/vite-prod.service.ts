
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteProdService } from '@projects/shared/src/vite/vite-prod/vite-prod.service';
import { BlazorAppViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class BlazorAppViteProdService extends ViteProdService {
    @CustomInject(BlazorAppViteSharedService)
    protected blazorAppClientViteSharedService: BlazorAppViteSharedService;

    createConfiguration(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.blazorAppClientViteSharedService.createConfiguration(),
            {

            }as UserConfig,
            options,
        );
    }

    createConfigurationForSass(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            this.createConfigurationForSass(),
            {

            } as UserConfig,
            options,
        );
    }

}
