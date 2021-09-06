import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { MergeService } from '../../../modules/utilities/merge/merge/merge.service';

@CustomInjectable()
export class WebpackPluginBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;

    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    constructor(private ConstructorClass: { new (...options: any[]): any }) {}

    createOptions(options?) {
        
        if(Array.isArray(options)) {
            return this.mergeService.mergeOptions([], options);
        }

        return this.mergeService.mergeOptions({}, options);
    }

    createManyOptions<T>(...options: T[]): T[] {
        if (options.length === 0) {
            options = [{} as any];
        }

        return options.map((option) => {
            return this.createOptions(option);
        });
    }

    createPlugin<C = any, T = any>(...options: T[]): C {
        return new this.ConstructorClass(...this.createManyOptions(...options));
    }

    createManyPlugins(...manyManyOptions: any[]) {
        return manyManyOptions.map((manyOptions) => {
            if (!Array.isArray(manyOptions)) {
                manyOptions = [manyOptions];
            }

            return this.createPlugin(...manyOptions);
        });
    }
}
