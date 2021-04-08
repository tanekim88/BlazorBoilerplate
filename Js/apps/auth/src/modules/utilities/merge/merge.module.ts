import { CustomModule } from '@shared/src/functions/process-webpack-providers';

import { AuthMergeService } from './merge/merge.service';

@CustomModule({
    providers: [AuthMergeService],
})
export class MergeModule {}
