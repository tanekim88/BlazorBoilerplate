import { CustomModule } from '@projects/shared/src/functions/process-providers';

import { AuthMergeService } from './merge/merge.service';

@CustomModule({
    providers: [AuthMergeService],
})
export class MergeModule {}
