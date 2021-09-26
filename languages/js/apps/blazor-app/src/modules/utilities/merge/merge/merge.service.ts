import { MergeService } from '#shared/src/modules/utilities/modules/merge/merge/merge.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppMergeService extends MergeService {}
