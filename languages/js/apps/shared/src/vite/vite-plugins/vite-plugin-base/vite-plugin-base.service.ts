import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/modules/merge/merge/merge.service';
import {Plugin} from 'vite';
@CustomInjectable()
export class VitePluginBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    createOptions(options?:any) {
        return this.mergeService.mergeOptions(
            {

            },
            options,
        );
    }

    createPlugin(...options: any): Plugin {
        return {} as any
    }
}
