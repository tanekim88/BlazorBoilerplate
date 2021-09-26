import { MergeService } from '@projects/shared/src/modules/utilities/modules/merge/merge/merge.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppMergeService extends MergeService {}
