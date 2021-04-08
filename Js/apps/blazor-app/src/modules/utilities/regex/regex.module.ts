import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { BlazorAppRegexService } from './regex/regex.service';

@CustomModule({
    providers: [BlazorAppRegexService],
})
export class RegexModule {}
