import { Module } from '@nestjs/common';
import { CustomModule } from '@shared/src/functions/process-providers';
import { PathService } from './path/path.service';

@CustomModule({
    providers: [PathService],
})
export class PathModule {}
