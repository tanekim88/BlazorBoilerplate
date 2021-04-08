import { Module } from '@nestjs/common';
import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { PathService } from './path/path.service';

@CustomModule({
    providers: [PathService],
})
export class PathModule {}
