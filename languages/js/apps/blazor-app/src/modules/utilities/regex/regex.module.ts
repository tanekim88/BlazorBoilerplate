import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { BlazorAppRegexService } from './regex/regex.service';

@CustomModule({
    providers: [BlazorAppRegexService],
})
export class RegexModule {}
