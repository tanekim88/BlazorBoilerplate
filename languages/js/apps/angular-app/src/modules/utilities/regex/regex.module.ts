import { CustomModule } from '#shared/src/functions/process-providers';
import { AngularAppRegexService } from './regex/regex.service';

@CustomModule({
    providers: [AngularAppRegexService],
})
export class RegexModule {}
