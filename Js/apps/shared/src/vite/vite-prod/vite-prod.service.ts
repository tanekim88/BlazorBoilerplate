import { ViteBaseService } from '../Vite-base/Vite-base.service';


import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { ViteSharedService } from '../vite-shared/vite-shared.service';

@CustomInjectable()
export class ViteProdService extends ViteBaseService {
    @CustomInject(ViteSharedService)
    protected viteSharedService: ViteSharedService;

    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            this.viteSharedService.createConfiguration(),
            {
                mode:'production'
            } as UserConfig,
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
