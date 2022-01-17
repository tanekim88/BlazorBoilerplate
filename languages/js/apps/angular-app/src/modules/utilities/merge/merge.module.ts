import { CustomModule } from '#shared/src/functions/process-providers';

import { AngularAppMergeService } from './merge/merge.service';

@CustomModule({
    providers: [AngularAppMergeService],
})
export class MergeModule {}
