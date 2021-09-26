import { CustomModule } from '#shared/src/functions/process-providers';

import { SolidAppMergeService } from './merge/merge.service';

@CustomModule({
    providers: [SolidAppMergeService],
})
export class MergeModule {}
