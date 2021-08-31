import { MergeService } from '#shared/src/modules/utilities/merge/merge/merge.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class AuthMergeService extends MergeService {}
