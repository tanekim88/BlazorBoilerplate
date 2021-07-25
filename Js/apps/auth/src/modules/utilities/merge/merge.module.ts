import { CustomModule } from '@shared/src/functions/process-providers';

import { AuthMergeService } from './merge/merge.service';

@CustomModule({
    providers: [AuthMergeService],
})
export class MergeModule {}
