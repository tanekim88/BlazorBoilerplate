import { CustomModule } from '#shared/src/functions/process-providers';

import { ReactAppMergeService } from './merge/merge.service';

@CustomModule({
    providers: [ReactAppMergeService],
})
export class MergeModule {}
