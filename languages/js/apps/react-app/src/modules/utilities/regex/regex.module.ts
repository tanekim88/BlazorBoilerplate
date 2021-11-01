import { CustomModule } from '#shared/src/functions/process-providers';
import { ReactAppRegexService } from './regex/regex.service';

@CustomModule({
    providers: [ReactAppRegexService],
})
export class RegexModule {}
