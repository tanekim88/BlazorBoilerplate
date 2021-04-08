import { CustomModule } from '../../../functions/process-webpack-providers';
import { RegexService } from './regex/regex.service';

@CustomModule({
    providers: [RegexService],
})
export class RegexModule {}
