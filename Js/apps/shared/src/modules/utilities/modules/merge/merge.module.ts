import { CustomModule } from '../../../../functions/process-providers';

import { MergeService } from './merge/merge.service';

@CustomModule({
    providers: [MergeService],
})
export class MergeModule {}
