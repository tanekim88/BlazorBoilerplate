import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { PostcssModule } from '@projects/shared/src/modules/postcss/postcss.module';
import { Module } from '@nestjs/common';
import { BlazorAppPostcssService } from './postcss/postcss.service';


@CustomModule({
    imports: [PostcssModule],
    providers: [BlazorAppPostcssService],
})
export class BlazorPostcssModule {}
