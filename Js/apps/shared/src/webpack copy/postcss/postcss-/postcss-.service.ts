import { MergeService } from '../../../modules/utilities/merge/merge/merge.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '#shared/src/modules/environment/environment/environment.service';
@CustomInjectable()
export class WebpackPostcssBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    constructor(private ConstructorClass: any) {}

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions({}, options);
    }

    createPlugin(options?: any): any {
        return this.ConstructorClass(this.createOptions(options));
    }
}
