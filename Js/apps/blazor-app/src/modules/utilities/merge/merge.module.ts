import { CustomModule } from '@shared/src/functions/process-providers';

import { BlazorAppMergeService } from './merge/merge.service';

@CustomModule({
    providers: [BlazorAppMergeService],
})
export class MergeModule {}
