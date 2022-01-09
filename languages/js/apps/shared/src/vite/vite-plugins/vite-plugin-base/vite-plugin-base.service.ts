import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/modules/merge/merge/merge.service';
import { Plugin } from 'vite';
import _ from 'lodash';
@CustomInjectable()
export class VitePluginBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    createOptions(options?: any) {
        return this.mergeService.mergeOptions(
            {

            },
            options,
        );
    }

    createPrePlugin(...options: any): Plugin {
        return {} as any
    }

    createPlugin(...options: any): Plugin {
        return {} as any
    }

    createPostPlugin(...options: any): Plugin {
        return {} as any
    }

    createPlugins(...options: any): Plugin[] {
        return [
            this.createPrePlugin(...options),
            this.createPlugin(...options),
            this.createPostPlugin(...options)].filter(plugin => {
                return !_.isEmpty(plugin);
            })
    }
}
