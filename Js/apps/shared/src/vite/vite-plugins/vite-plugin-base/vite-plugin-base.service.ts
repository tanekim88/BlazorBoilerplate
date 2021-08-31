import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/merge/merge/merge.service';
import {Plugin} from 'vite';
@CustomInjectable()
export class VitePluginBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    createPlugin<T = any>(...options: T[]): Plugin {
        return {} as any
    }
}
