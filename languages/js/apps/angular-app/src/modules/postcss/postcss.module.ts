import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { Module } from '@nestjs/common';
import { AngularAppPostcssService } from './postcss/postcss.service';


@CustomModule({
    imports: [PostcssModule],
    providers: [AngularAppPostcssService],
})
export class AngularAppPostcssModule {}
